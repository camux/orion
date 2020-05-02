
import React from 'react'
import DashChart from 'views/Chart/DashChart'
import { getModels } from 'models/pool'
import tools from 'tools/common'

const database = tools.getDatabase()

const _routes = [
  {
    path: '/',
    name: 'menu.dashboard',
    icon: 'pie chart',
    model: null,
    component: <DashChart />,
    layout: `/${database}/admin/dashboard`
  }
]

async function getRoutes () {
  const models = await getModels()
  if (models) {
    for (const m of models) {
      _routes.push(m)
    }
    return _routes
  }
}

export default getRoutes
