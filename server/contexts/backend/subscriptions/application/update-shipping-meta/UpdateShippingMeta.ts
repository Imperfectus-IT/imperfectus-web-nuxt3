export class UpdateShippingMeta {
  constructor(private subscriptionRepository: SubscriptionRepository) {
  }

  async execute(metaId: number, newShippingMeta: any) {
    return await this.subscriptionRepository.updateShippingMeta(metaId, newShippingMeta)
  }
}
