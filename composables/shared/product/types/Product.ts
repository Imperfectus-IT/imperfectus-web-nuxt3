export type Product = {
    id: number
    SKU: string
    weight: number
    price: number
    isImperfectusProduct: boolean
    name_ca: string
    name_es: string
    description_ca: string
    description_es: string
    content_ca: any
    content_es: any
    isActive: boolean
    frequency: string
    type: string
    priceType: string
    boxType: string
    itemType: any
    unitPrice: any
    units: any
    imagePath: any
    image: ProductImage[]
}
export type ProductImage = {
    id: number
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: ProductImageFormat
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: ProviderMetadata5
    created_by: number
    updated_by: number
    created_at: string
    updated_at: string
}

export type ProductImageFormat = {
    large: Large
    small: Small
    medium: Medium
    thumbnail: Thumbnail
}

export type Large = {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: ProviderMetadata
}

export type ProviderMetadata = {
    public_id: string
    resource_type: string
}

export type Small = {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: ProviderMetadata2
}

export type ProviderMetadata2 = {
    public_id: string
    resource_type: string
}

export type Medium = {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: ProviderMetadata3
}

export type ProviderMetadata3 = {
    public_id: string
    resource_type: string
}

export type Thumbnail = {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: ProviderMetadata4
}

export type ProviderMetadata4 = {
    public_id: string
    resource_type: string
}

export type ProviderMetadata5 = {
    public_id: string
    resource_type: string
}

export type ProductQuery = {
    isActive?: boolean
    type?: string
    filter?: string
    frequency?: string
    boxType?: string
    _sort?: string
}