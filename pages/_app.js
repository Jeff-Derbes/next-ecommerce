import '../styles/globals.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function App({Component, pageProps}) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav><Navbar/>
            </nav>
            <div className="flex-grow"><Component {...pageProps} /></div>
            <footer className=""><Footer/></footer>
        </div>
    )
}
