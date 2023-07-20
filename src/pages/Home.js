import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import SmoothieCard from "../components/smoothieCard"

const Home = () => {
  const [error, setError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    console.log(supabase)
    const getSmoothies = async () => {
      const {data, error} = await supabase
      .from('smoothies')
      .select()
      console.log(data)
      if(error) {
        setError('Error fetching smoothies')
        setSmoothies(null)
        console.log(error)
      }

      if (data) {
        setSmoothies(data)
        setError(null)
      }
    }
    getSmoothies()
  }, [])
  return (
    <div className="page home">
      {error && (<p>{error}</p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie ={smoothie}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home