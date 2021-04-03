import '../src/styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <main className={"bg-black w-full h-screen text-white container mx-auto"}>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp