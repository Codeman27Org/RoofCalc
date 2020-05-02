import React from 'react'
import { Button } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


const Results = (props) => {
  return (
    <div className='results'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <div className='text-center'>
      <div className='accordion-area'>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className='expand-icon'/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className='accordion-summary'
          >
            <Typography>Principal & Interest</Typography>
            <Typography className='accordion-total'>$1,300/Mo</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className='button-box'>
        <Button variant='outlined' color='primary' onClick={() => props.switch()}>
          Back
        </Button>
      </div>
      </div>
    </div>
  )
}

export default Results
