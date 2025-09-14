import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET - Récupérer les informations de l'abonnement de l'utilisateur
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Récupérer l'abonnement de l'utilisateur avec les détails du plan
    const { data: subscription, error: subscriptionError } = await supabaseAdmin
      .from('user_subscriptions')
      .select(`
        *,
        subscription_plans (
          name,
          max_credits,
          price
        )
      `)
      .eq('user_id', userId)
      .single()

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      console.error('Error fetching subscription:', subscriptionError)
      return NextResponse.json(
        { error: 'Failed to fetch subscription' },
        { status: 500 }
      )
    }

    // Si l'utilisateur n'a pas d'abonnement, créer un abonnement par défaut
    if (!subscription) {
      const { data: defaultPlan } = await supabaseAdmin
        .from('subscription_plans')
        .select('*')
        .eq('name', 'Researcher')
        .single()

      if (defaultPlan) {
        const { data: newSubscription, error: createError } = await supabaseAdmin
          .from('user_subscriptions')
          .insert([
            {
              user_id: userId,
              plan_id: defaultPlan.id,
              current_usage: 0,
              is_pay_as_you_go: true
            }
          ])
          .select(`
            *,
            subscription_plans (
              name,
              max_credits,
              price
            )
          `)
          .single()

        if (createError) {
          console.error('Error creating default subscription:', createError)
          return NextResponse.json(
            { error: 'Failed to create subscription' },
            { status: 500 }
          )
        }

        return NextResponse.json({ data: newSubscription })
      }
    }

    return NextResponse.json({ data: subscription })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour l'abonnement de l'utilisateur
export async function PUT(request) {
  try {
    const body = await request.json()
    const { userId, planId, isPayAsYouGo } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const updateData = {}
    if (planId) updateData.plan_id = planId
    if (typeof isPayAsYouGo === 'boolean') updateData.is_pay_as_you_go = isPayAsYouGo

    const { data, error } = await supabaseAdmin
      .from('user_subscriptions')
      .update(updateData)
      .eq('user_id', userId)
      .select(`
        *,
        subscription_plans (
          name,
          max_credits,
          price
        )
      `)
      .single()

    if (error) {
      console.error('Error updating subscription:', error)
      return NextResponse.json(
        { error: 'Failed to update subscription' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
