import { ExerciseData } from '../types';

// This component should have its own individual state...

const Exercise = ({ workout }: { workout: ExerciseData }) => {
    return (
        <div>
            <div>
                <div>
                    <h2>Exercise: {workout.exercise}</h2>
                    {workout.sets} sets of {workout.reps} reps{' '}
                    {workout.amount && `with ${workout.amount}`} <br />
                    <span>Rest time:</span>
                    {workout.rest} secs.
                </div>
            </div>
            <div id="Press Upsbar">
                Progress:<progress className="bar" value="1" max="2"></progress>
                <button
                    id="Press Upsset"
                    style={{
                        // To make this conditional do
                        // display: variableName ? 'block' : 'none'
                        display: 'block',
                    }}
                    className=""
                >
                    1 sets left.
                </button>
            </div>
            <button id="Press Upsstart" style={{ display: 'none' }}>
                Restart Press Ups
            </button>
            <button
                id="Press Upstimer"
                className="timerBtn restDone"
                style={{ display: 'block' }}
            >
                Get back to work.🏋️&zwj;♂️
            </button>
        </div>
    );
};

export default Exercise;
