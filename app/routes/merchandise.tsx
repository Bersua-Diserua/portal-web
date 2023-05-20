import { motion, AnimatePresence, usePresence } from "framer-motion"
import { useEffect, useState } from "react"

const images = [
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  "https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  "https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
]

export default function () {
  const [activeIdx, setActiveIdx] = useState<string>(images[0])
  const [imgsLoaded, setImgsLoaded] = useState(false)

  useEffect(() => {
    const loadImage = (image: string) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.src = image
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image)
          }, 1_000)

        loadImg.onerror = (err) => reject(err)
      })
    }

    Promise.all([...images.map((image) => loadImage(image)), new Promise((res) => setTimeout(res, 500))])
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err))
  }, [setImgsLoaded])

  return (
    <>
      <AnimatePresence>
        {!imgsLoaded ? (
          <Loading />
        ) : (
          <motion.div
            className="bg-red-200 h-screen w-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AnimatePresence key={activeIdx}>
              <motion.img
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{}}
                className="absolute inset-0 object-cover bg-red-600"
                src={activeIdx}
                alt=""
              ></motion.img>
            </AnimatePresence>
            <motion.div layoutScroll className="bg-red-500 flex fixed bottom-0 w-full h-[10rem] overflow-scroll">
              {images.map((x, idx) => (
                <motion.div layout key={idx} className="min-w-[10rem] min-h-[10rem] aspect-square overflow-hidden">
                  <motion.img
                    onClick={() => setActiveIdx(x)}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.5 }}
                    initial={{ scale: 2 }}
                    animate={{ scale: 1 }}
                    src={x}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Loading() {
  return (
    <motion.div
      className="bg-yellow-300 inset-0 fixed"
      exit={{
        opacity: 0,
      }}
    >
      <motion.div
        className="h-[5rem] w-[5rem] bg-white absolute top-1/2 left-1/2 rounded-full"
        style={{
          x: -50,
          y: -50,
        }}
        animate={{
          scale: [1, 1.5, 1.5, 1, 1.5],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </motion.div>
  )
}
