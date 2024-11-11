export const SERVICE_STATUS: any = {
  PUBLISHED: {
    label: 'Published to portal',
    iconPath: new URL('../assets/icons/icon-published.svg', import.meta.url),
  },
  UNPUBLISHED: {
    label: 'Unpublished',
    iconPath: new URL('../assets/icons/icon-unpublished.svg', import.meta.url),
  },
  IN_PROGRESS: {
    label: 'In progress',
    iconPath: new URL('../assets/icons/icon-progress.svg', import.meta.url),
    iconClass: 'icon-spin',
  },
}

export const FALLBACK_AVATAR =
  'https://avatars.githubusercontent.com/u/93808885'
