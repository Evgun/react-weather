import React from 'react';

import Grid from '@material-ui/core/Grid';
import SaveLocation from './SaveLocation';
import SearchLocation from './SearchLocation';
import GetLocation from './GetLocation';



function HeaderComponent() {
  return (
      <Grid
        className="header-container"
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <SaveLocation />
        <SearchLocation />
        <GetLocation />
      </Grid>
    );
}

export default HeaderComponent;

