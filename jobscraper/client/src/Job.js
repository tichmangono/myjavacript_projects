import React from 'react'
import Typography from '@material-ui/core/Typography';


export default function Job({job}){
    return (
        <div className={'job'}>
            <span>{job.title}</span>
            <span>{job.company}</span>
        </div>        
    )
}