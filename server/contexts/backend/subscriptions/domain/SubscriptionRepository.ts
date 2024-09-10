export interface SubscriptionRepository {
  getById(id: number): Promise<Subscription | null>
  getByUserId(userId: number): Promise<Subscription[] | null>
}
