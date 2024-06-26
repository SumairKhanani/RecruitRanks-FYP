import { Dataset, LocationCity, PinDrop, Work } from '@mui/icons-material'
import './previewJob.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'

function PreviewJobComp({ onAppsPage, job }) {
    const [loading, setLoading] = useState(false)
    const { jobId } = useParams()
    const [jobP, setJobP] = useState({ _id: "n/a" })
    const navigate = useNavigate()
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    useEffect(() => {
        const getJob = async () => {
            axios.get(`/userActiveJob/${jobId}`).then((res) => {
                setJobP(res.data)
            }).catch((err) => console.log(err))
        }
        !onAppsPage ? jobP._id === "n/a" ? getJob() : console.log("") : setJobP(job);
    })

    const discardJob = async () => {
        setLoading(true)
        axios.put(`/deletejob/${jobId}`)
        notifySuc();
        await delay(500).then(() => navigate(`/HRView/createJob/`));
    }
    const publishNotif = async () => {
        setLoading(true)
        notifySuc();
        await delay(500);
        navigate("/HRView/")
    }

    const notifySuc = () => toast.success('Job Published', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const notifyDel = () => toast.success('Job Discarded', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });


    return (
        <>
            <div className={onAppsPage ? "previewJobComOnPage" : "previewJobCom"}>
                <div className="previewJobCompWrapper">
                    {onAppsPage ? null : <div className="topBar">
                        <div className="Heading">Preview</div>
                        {loading ? <div className="workingOnIt">
                            <CircularProgress /> Working on it...
                        </div> :
                            <div className="buttonContainer">
                                <Link to={`/HRView/editJob/${jobId}`}>
                                    <button className="preview">Edit</button>
                                </Link>
                                <button className="discard" onClick={discardJob}>Discard</button>
                                <button className="preview" onClick={publishNotif}>Publish</button>
                            </div>}
                    </div>}
                    {jobP._id === "n/a" ?
                        <div>Loading...</div>
                        : <div className={onAppsPage ? "bottomAreaWoPadding" : "bottomArea"}>
                            {onAppsPage ? null : <div className="JTitle">{jobP.jobTitle}</div>}
                            <div className="panes">
                                <div className="leftSide">
                                    {onAppsPage ? null : <div className="firstSection">
                                        <div className="listItem"><PinDrop /> {jobP.location} (On Site)</div>
                                        <div className="listItem"><Work /> Part-time</div>
                                        <div className="listItem"><LocationCity /> Manhattan Software, LLC.</div>
                                    </div>}
                                    {onAppsPage ? null : <div className="skillsSection">
                                        <div className="skillText"><Dataset /> Skills</div>
                                        <div className="skillItems">
                                            {jobP.skills.map((s) => <div className="skillItem">{s}</div>)}
                                        </div>
                                    </div>}
                                    <div className="Title">Job Description</div>

                                    <div dangerouslySetInnerHTML={{ __html: jobP.description }}></div>

                                    <div className="Title">Requirements</div>
                                    <div dangerouslySetInnerHTML={{ __html: jobP.requiremets }}></div>


                                    {onAppsPage ? <div className="skillsSection">
                                        <div className="skillText"><Dataset /> Skills</div>
                                        <div className="skillItems">
                                            {jobP.skills.map((s) => <div className="skillItem">{s}</div>)}

                                        </div>
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default PreviewJobComp