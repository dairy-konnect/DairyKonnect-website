export type LivestockImgKey = 'gir' | 'holstein' | 'murrah' | 'sahiwal' | 'jersey' | 'crossbreed'

const IMG_GRADIENT: Record<LivestockImgKey, string> = {
  gir: 'bg-gradient-to-br from-[#fde2cf] to-[#7a4a1a]',
  holstein: 'bg-gradient-to-br from-[#f0f0f0] to-[#444444]',
  murrah: 'bg-gradient-to-br from-[#444444] to-[#0a0a0a]',
  sahiwal: 'bg-gradient-to-br from-[#fef0d4] to-[#a17a26]',
  jersey: 'bg-gradient-to-br from-[#fde2cf] to-[#c4521a]',
  crossbreed: 'bg-gradient-to-br from-[#dff7e7] to-[#155e3f]',
}

export function listingImageClass(key: LivestockImgKey): string {
  return IMG_GRADIENT[key]
}

/** Map free-text breed / animal_type to hero gradient when no photo is available. */
export function inferImageKey(animalType: string, breed?: string | null): LivestockImgKey {
  const blob = `${breed || ''} ${animalType || ''}`.toLowerCase()
  if (blob.includes('murrah') || blob.includes('buffalo')) return 'murrah'
  if (blob.includes('holstein') || blob.includes('hf')) return 'holstein'
  if (blob.includes('gir')) return 'gir'
  if (blob.includes('sahiwal')) return 'sahiwal'
  if (blob.includes('jersey')) return 'jersey'
  if (blob.includes('cross') || blob.includes('heifer') || blob.includes('calf')) return 'crossbreed'
  return 'gir'
}
