import React from 'react';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function MenuComponent({cnt}) {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <ToggleButtonGroup size="medium" value={cnt.toString()} exclusive>
          <ToggleButton value="8">
            <Link className="forecast-range-btn" to='/'>Today</Link>
          </ToggleButton>
          <ToggleButton value="40">
            <Link className="forecast-range-btn" to='/5-days'>5 Days</Link>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    cnt: state.weather.cnt,
  }
}

export default connect(
  mapStateToProps,
  null
)(MenuComponent);
