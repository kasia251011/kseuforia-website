import clsx from 'clsx'
import LogoMd from '@/assets/logos/euforia-logo-circle-white-lg.png';
import Image from 'next/image';

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <Image
      alt="KS Euforia Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('size-[64px] w-full transition-all duration-300', className)}
      src={LogoMd.src}
    />
  )
}
