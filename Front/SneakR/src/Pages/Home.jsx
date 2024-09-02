import '../css/colors.css'

import Navbar from '../Tools/Navbar'
import Load from '../Tools/Load'

import { useState, useEffect } from 'react'

function Home() {

    const [element, setElement] = useState(<Load />)
    // useEffect(() => {
    //     const token = "Bearer " + localStorage.getItem("token");

    //     AXIOS.get(localStorage.getItem("url") + "/current_user", { headers: { Authorization: token } })
    //         .then(res => {
    //             var widgets = res.data.widgets.map((w) => { return <Widget key={GenerateKey()} w={w} /> })
    //             setElement(
    //                 <>
    //                     { res?.data?.cat ?  <Background url={res?.data?.cat["picture"]} /> : <></> }
    //                     { res?.data?.cat ?  <Text text={res?.data?.cat["fact"]} /> : <></> }
    //                     <Background url={res?.data?.background} />
    //                     <AlbumsShelf albums={res?.data?.songs} />
    //                     {widgets}
    //                 </>
    //             )
    //         })
    //         .catch(err => {
    //             Error({ "res": err })
    //         });
    // }, []);

    useEffect(() => {
        setElement(<Text> oui </Text>);
    })

    return (
        <div>
            <Navbar currentPage="Home" />
            <div className="content">
                {element}
            </div>
        </div>
    );
}

export default Home