import '../src/styles/globals.css'
import {SelectedDiceProvider} from "../src/providers/selectedDiceContext";

function MyApp({ Component, pageProps }) {
    return (
        <main className={"bg-black w-full h-screen text-white container mx-auto"}>
            <SelectedDiceProvider>
                <Component {...pageProps} />
            </SelectedDiceProvider>
        </main>
    );
}

export default MyApp