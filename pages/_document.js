import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document{
    render(){
        return(
            <Html lang="en">
                <body>
                    <div id="overlay" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;