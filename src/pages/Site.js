import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Translate} from '../components'

class Site extends Component {
  render() {
    const {params, sites} = this.props
    const site = sites.filter(s => s._id === params.id)[0] || {}
    return (
      <div>
        <h2>
          <span>{site.name}&nbsp;</span>
          <small><Translate content="users" /></small>
        </h2>
        <pre>{JSON.stringify(site, null, 2)}</pre>
      </div>
    )
  }
}

const mapStatetoProps = (store, ownProps) => ({
  isAuth: store.session.isAuth,
  isLoading: store.session.isLoading,
  session: store.session,
  sites: (store.session && store.session.sites) || []
})

const ConnectedSite = connect(mapStatetoProps)(Site)

export {ConnectedSite as Site};
