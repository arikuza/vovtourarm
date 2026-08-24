import React, { useState, useEffect } from "react"
import { withPrefix } from "gatsby"
import { backgrounds } from "../data/image-manifest"

// Скорость смены фонов (мс) — единая для всех страниц
export const BACKGROUND_ROTATION_INTERVAL = 4000

// Общая точка отсчёта ротации: живёт на уровне модуля, поэтому при
// клиентских переходах между страницами слайдер не начинается заново,
// а продолжается с текущей позиции и фазы.
let rotationEpoch = null

const getRotationState = (poolLength, interval) => {
  if (rotationEpoch === null) {
    rotationEpoch = Date.now()
  }
  const elapsed = Date.now() - rotationEpoch
  return {
    index: Math.floor(elapsed / interval) % poolLength,
    msUntilNext: interval - (elapsed % interval),
  }
}

const RotatingBackground = ({ images, interval = BACKGROUND_ROTATION_INTERVAL }) => {
  const pool = (images && images.length > 0 ? images : backgrounds).map(img =>
    img.startsWith("http") ? img : withPrefix(img)
  )
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (pool.length < 2) return undefined
    let timer
    const tick = () => {
      const { index, msUntilNext } = getRotationState(pool.length, interval)
      setCurrent(index)
      timer = setTimeout(tick, msUntilNext)
    }
    tick()
    return () => clearTimeout(timer)
  }, [pool.length, interval])

  return (
    <div className="bg-rotator" aria-hidden="true">
      {pool.map((image, index) => (
        <div
          key={image}
          className={`bg-rotator-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  )
}

export default RotatingBackground
