import './spinner.css';

type SpinnerProps = {
    active: boolean,
    children: React.ReactNode;
}

function Spinner({ active, children }: SpinnerProps) {
    if (active) {
        return <div className='Spinner'>{children}</div>
    } else {
        return children;
    }
}


export default Spinner;
