// utils/handleWheel.ts

export type HandleWheelOptions = {
  currentIndex: number
  wordsLength: number
  isAnimating: boolean
  animateWordChange: (newIndex: number, direction: 'up' | 'down') => void
  scrollAccumulator: { current: number }
  scrollThreshold: number
}

export const handleWheel = (
  e: WheelEvent,
  {
    currentIndex,
    wordsLength,
    isAnimating,
    animateWordChange,
    scrollAccumulator,
    scrollThreshold,
  }: HandleWheelOptions,
) => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Aşağı scroll: son kelimeye ulaştıysak normal scroll'a izin ver
  if (currentIndex === wordsLength - 1 && e.deltaY > 0) {
    return // Normal scroll devam etsin
  }

  // Yukarı scroll: sayfa en üstte değilse normal scroll'a izin ver
  if (e.deltaY < 0 && scrollTop > 0) {
    return // Önce normal scroll ile sayfa en üste çıksın
  }

  // Sayfa en üstte ve yukarı scroll: kelimeler geriye gitsin
  if (e.deltaY < 0 && scrollTop === 0 && currentIndex > 0) {
    e.preventDefault()

    if (isAnimating) return

    scrollAccumulator.current += e.deltaY

    if (Math.abs(scrollAccumulator.current) >= scrollThreshold) {
      const newIndex = currentIndex - 1

      animateWordChange(newIndex, 'up')
      scrollAccumulator.current = 0
    }

    return
  }

  // Normal kelime değişimi (aşağı)
  if (e.deltaY > 0 && currentIndex < wordsLength - 1) {
    e.preventDefault()

    if (isAnimating) return

    scrollAccumulator.current += e.deltaY

    if (Math.abs(scrollAccumulator.current) >= scrollThreshold) {
      const newIndex = currentIndex + 1

      animateWordChange(newIndex, 'down')
      scrollAccumulator.current = 0
    }
  }
}
