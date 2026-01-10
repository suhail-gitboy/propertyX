import React from 'react'

const Carousalimg = ({ images, carouselId }) => {
    const goTo = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
        }
    }

    return (
        <div className="carousel w-full h-80 md:h-[420px] rounded-xl overflow-hidden scroll-m-0">
            {images.map((img, index) => {
                const prev = index === 0 ? images.length - 1 : index - 1
                const next = index === images.length - 1 ? 0 : index + 1

                return (
                    <div
                        key={index}
                        id={`slide-${carouselId}-${index}`}
                        className="carousel-item relative w-full"
                    >
                        <img
                            src={img.url}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
                            <button
                                onClick={() => goTo(`slide-${carouselId}-${prev}`)}
                                className="btn btn-circle btn-sm bg-black/50 border-none text-white"
                            >
                                ❮
                            </button>

                            <button
                                onClick={() => goTo(`slide-${carouselId}-${next}`)}
                                className="btn btn-circle btn-sm bg-black/50 border-none text-white"
                            >
                                ❯
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}



export default Carousalimg
