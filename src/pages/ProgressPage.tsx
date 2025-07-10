import { useState, useCallback, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { ProgressData, ProgressHist } from '../types';
import NavBar from '../components/NavBar';
import { useAppContext } from '../assets/AppContext';
import WeightProgressChart from '../components/WeightProgressChart';
import BMIProgressChart from '../components/BMIProgressChart';
import useCheckStoredProgress from '../assets/hooks/useCheckStoredProgress';

const defaultProgress: ProgressData = {
    date: '',
    weight: null,
};

export default function ProgressPage() {
    const {
        userID,
        fetchProfileFromFirestore,
        profileData,
        setUserHeight,
        setTargetWeight,
        userHeight,
    } = useAppContext();
    const {
        progressHistory,
        setProgressHistory,
        newProgress,
        setNewProgress,
        progressDates,
        fetchProgressHistory,
    } = useCheckStoredProgress(userID);
    const [progressData, setProgressData] = useState(defaultProgress);
    const [chartDate, setChartDate] = useState('');
    const [showProgressForm, setShowProgressForm] = useState(false);
    const [showDelProgress, setShowDelProgress] = useState(false);
    const [delProgress, setDelProgress] = useState(0);
    const BMI_CONVERSION_FACTOR = 10000; // Convert cm² to m² (100²)
    const BMI_ROUNDING_MULTIPLIER = 10; // For 1 decimal place precision

    useCheckStoredProgress(userID);

    useEffect(() => {
        fetchProfileFromFirestore();
        setTargetWeight(profileData.weightGoal);
        setUserHeight(profileData.height);
    }, [
        fetchProfileFromFirestore,
        profileData,
        setTargetWeight,
        setUserHeight,
    ]);

    const getCurrentDate = () => {
        // get current date to limit choosing future date for progress entry.
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();

        return `${year}-${month}-${day}`;
    };

    function formatDate(dateString: string): string {
        // func to formate date for easy reading on chart.
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);

        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        };

        return `${day}${daySuffix(day)} ${month} ${year}`;
    }

    function formatBmi(value) {
        const bmi = (value / userHeight ** 2) * BMI_CONVERSION_FACTOR; // Calculate BMI using the formula: weight(kg) / height(m)²
        return (
            Math.round(bmi * BMI_ROUNDING_MULTIPLIER) / BMI_ROUNDING_MULTIPLIER
        );
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        //  Handle form input value change
        const { name, value } = event.target;
        setProgressData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
        if (name === 'date') {
            //if the input is the date then format the date for chart display.
            setChartDate(formatDate(value));
        } else if (name === 'weight') {
            //if the input is the weight value then calculate the bmi value.
            setNewProgress((prevData) => {
                return {
                    ...prevData,
                    weight: Number(value),
                    bmi: formatBmi(Number(value)),
                    date: progressData.date,
                    convDate: chartDate,
                };
            });
        }
    }

    const saveProgressToFirestore = useCallback(
        async (updatedProgress) => {
            try {
                await setDoc(doc(db, userID, 'progressHistory'), {
                    Progress: updatedProgress,
                });
            } catch (error) {
                console.error('Error saving progress: ', error);
                alert('Error saving progress. Please try again later.');
            }
        },
        [userID]
    );

    const saveProgress = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (progressDates.includes(`${chartDate}`)) {
            alert('Date already exists - Change date or delete old entry');
        } else {
            setProgressHistory((prevHistory: ProgressHist[]) => {
                const updatedProgress: ProgressHist[] = [
                    ...prevHistory,
                    ...(Array.isArray(newProgress)
                        ? newProgress
                        : [newProgress]),
                ];
                updatedProgress.sort(
                    (a, b) =>
                        Number(new Date(a.date)) - Number(new Date(b.date))
                );
                saveProgressToFirestore(updatedProgress);
                return updatedProgress;
            });
            fetchProgressHistory();
        }
        setShowProgressForm(false);
        setProgressData(defaultProgress);
    };

    //--------------------DELETE PROGRESS------------------
    const handleProSelect = (e) => {
        setDelProgress(e.target.value);
    };

    const deleteProgress = (delDate) => {
        setProgressHistory((oldProgress) => {
            //updates the state of the workoutPlan
            const newProgress = oldProgress.filter(
                (date) => date.convDate !== delDate
            ); //filters for dates that don't match the deleted date and sends them to the new Progress arrary.
            saveProgressToFirestore(newProgress);
            return newProgress;
        });
        fetchProgressHistory();
        setShowDelProgress(false); //Fetch fresh data from Firestore DB
    };

    return (
        <>
            <NavBar />
            <h3>Track Your Progress</h3>
            <div className="row justify-content-center px-xl-4">
                <div className="col-11 col-md-8 col-xxl-5 mb-3">
                    <WeightProgressChart progressHistory={progressHistory} />
                </div>
                <div className="col-11 col-md-8 col-xxl-5 mb-3">
                    <BMIProgressChart progressHistory={progressHistory} />
                </div>
            </div>
            {!showProgressForm ? (
                <button
                    className="btn btn-lg btn-primary m-4"
                    onClick={() => setShowProgressForm(true)}
                    aria-label="Update Progress"
                >
                    Update Progress
                </button>
            ) : (
                <div className="container-fluid my-4">
                    <form
                        className="form-group"
                        id="profile-form"
                        onSubmit={saveProgress}
                    >
                        <h4>Update Your Progress</h4>
                        <div className="row justify-content-center gx-3 my-4">
                            <div
                                className="form-floating col-5 col-sm-4 mb-2"
                                style={{ maxWidth: '250px' }}
                            >
                                <input
                                    className="form-control date-input-dark"
                                    type="date"
                                    placeholder="dd-mm-yyyy"
                                    id="date"
                                    name="date"
                                    max={getCurrentDate()}
                                    onChange={handleChange} // Handle change from typed input.
                                    value={progressData.date}
                                    required
                                />
                                <label htmlFor="date">Date:</label>
                            </div>
                            <div
                                className="col-5 col-sm-4 mb-2"
                                style={{ maxWidth: '250px' }}
                            >
                                <div className="input-group">
                                    <div className="form-floating">
                                        <input
                                            className="form-control"
                                            type="number"
                                            placeholder="Enter Current weight"
                                            id="weight"
                                            name="weight"
                                            onChange={handleChange} // Handle change from typed input.
                                            value={progressData.weight}
                                            required
                                        />
                                        <label htmlFor="weight">Weight:</label>
                                    </div>
                                    <span className="input-group-text bg-dark">
                                        Kg's
                                    </span>
                                </div>
                            </div>
                            <button
                                className="btn btn btn-primary col-8 m-2"
                                style={{
                                    maxWidth: '200px',
                                    minWidth: '100px',
                                    width: '250px',
                                }}
                                type="submit"
                                aria-label="Save Progress"
                            >
                                Save Progress
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {!showDelProgress ? (
                <button
                    className="btn btn-lg btn-outline-secondary m-4"
                    onClick={() => setShowDelProgress(true)}
                    aria-label="Delete Progress"
                >
                    Delete Progress
                </button>
            ) : (
                <div
                    className="container-fluid justify-content-center"
                    style={{ maxWidth: '300px', minWidth: '200px' }}
                >
                    <h4>Delete Your Progress</h4>
                    <div
                        className="input-group my-3"
                        role="group"
                        aria-label="Button group with nested select list"
                    >
                        <select
                            className="form-select px-3 border-danger"
                            onChange={handleProSelect}
                            defaultValue="default"
                            aria-label="Select Progress"
                        >
                            <option value="default">Select Progress</option>{' '}
                            {progressDates.map((date, index) => (
                                <option key={index} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="btn btn-danger px-4"
                            onClick={() => {
                                deleteProgress(delProgress);
                            }}
                            aria-label="Delete"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
