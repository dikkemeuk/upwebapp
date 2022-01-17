import SectionTitle from 'components/Section';

export default function Videos() {

  const videos = [
    { id: 'X57rluee5xM' }, { id: 'GYoo4J3GqYA' },
    { id: 'JJloM1g_AT4' }, { id: '5-t0KXuJ5dE' },
    { id: 'P98-nAXzcVs' }, { id: 'm2D1H8_jNbM' },
    { id: 'QCOPNnaERTs' }, { id: 'dEtvPyHSV-A' },
    { id: 'xospMXrg7Ig' }, { id: 'rCQl3ui8CB4' },
    { id: 'Ijrw6-DI9U0' }, { id: '8PS_kX8FpjA' },
    { id: 'hUqz6iDXmW0' }, { id: 'stVWK43Jc-k' },
    { id: 'oc6CDLVeDDA' }, { id: 'Wr23bXwL-34' },
    { id: 'CMsSRxb2yZ4' }, { id: 'CYtyv2_5a6g' },
    { id: 'F8iyW7Mh2M4' }, { id: 'a1HYUWvY2kk' },
    { id: 'VB2WlvX26J8' }, { id: 'tl33Ob9xUxs' },
    { id: '8QO4vk_o5d0' }, { id: 'uk-fifyBBos' },
    { id: 'RTkSSGiShec' }, { id: '-UoIavSL-_4' },
    { id: 'IpxvQLsNGxw' }, { id: 't764rO0povE' },
    { id: 'yYvoeTKZJ10' }, { id: 'rNByK-Iyp4I' },
    { id: '1TSQsRWwQTg' }, { id: 'O2_q6AJBRSQ' },
    { id: 'nXPnqX_b3o4' }
  ]
  
    const calculateMove = (i: number, moveTo: "next" | "previous") => {
        if (i === 1 && moveTo === "previous") return videos.length;
        if (i === videos.length && moveTo === "next") return 1;
        return moveTo === "next" ? i + 1 : i - 1;
    
    }

    return (
        <div className="card shadow bg-gray-800 m-2">
        <div className="card-body">
          <div className="card-title">
            <SectionTitle pretitle="Our videos" align="center">
              Subscribe to our YouTube to stay updated with our latest videos!
            </SectionTitle>
          </div>
          <div className="w-full md:w-[75%] carousel self-center">
            {videos.map((vid, i) => (
              <div
                key={vid.id}
                className="relative w-full pt-20 carousel-item"
                id={`video${i + 1}`}
              >
                <div className="w-full grid place-items-center aspect-h-9 aspect-w-16">
                <iframe
                  key={vid.id}
                  src={`https://www.youtube.com/embed/${vid.id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                  //loading='lazy'
                > </iframe>
                </div>
                
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={`#video${calculateMove(i + 1, "previous")}`} className="btn btn-circle">❮</a> 
                  <a href={`#video${calculateMove(i + 1, "next")}`} className="btn btn-circle">❯</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}