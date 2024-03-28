
import "./uploader.css"

export default function Uploader() {
    return (
        <main>
            |<form action="" onClick={() => document.querySelector(".input-field").click()}>
                <input type="file" accept="image/*" className="input-field" hidden></input>
            </form>
        </main>
    )
}