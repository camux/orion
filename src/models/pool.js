
import React from 'react'

import Board from 'components/Board/Board'
import proxy from 'proxy'


export const getModels = async function () {
  let models = []
  const paths = window.location.pathname.split('/')
  const database = paths[1]
  const access_models = await proxy.get_models()

  if (!access_models) {
    return null
  }

  for (const model of access_models) {
    models.push({
      path: model.name,
      name: model.name,
      icon: model.icon,
      model: model.name,
      component: <Board ctxView={model} model={model.name} filters={model.filters} />,
      layout: `/${database}/admin/model/${model.name}`
    })
  }
  return models
}
