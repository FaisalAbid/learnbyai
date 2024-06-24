import { redirect } from "@sveltejs/kit"
import { fetchSubscription, getOrCreateCustomerId } from "../subscription_helpers.server.js";
export const load: PageServerLoad = async ({
  url,
  locals: { safeGetSession, supabaseServiceRole },
}) => {
  const { session } = await safeGetSession()
  if (!session) {
    redirect(303, "/login")
  }

  const { error: idError, customerId } = await getOrCreateCustomerId({
    supabaseServiceRole,
    session,
  })
  if (idError || !customerId) {
    redirect(303, "/login")
  }

  const { primarySubscription } = await fetchSubscription({
    customerId,
  })
  if (!primarySubscription) {
    // User already has plan, we shouldn't let them buy another
    //redirect(303, "/account/billing")
  }
  return {
    isActiveCustomer: !!primarySubscription,
    userId: session.user.id,
  }
};

export const actions = {
  signout: async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession()

  
      // User has a subscription, so we need to cancel it
    if (session) {
      await supabase.auth.signOut()
      redirect(303, "/")
    }
  },
}
