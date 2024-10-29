import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="justify-content-center m-5 p-5">
            <h1>OOPS, YOU SEEM LOST</h1>
            <h4>
                Click <Link to="/">ME</Link> to return Home.
            </h4>
        </div>
    );
}
