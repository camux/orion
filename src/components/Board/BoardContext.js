
import React, { createContext } from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

import QuickTable from 'components/Board/QuickTable'
import QuickForm from 'components/Board/QuickForm'
import QuickSheet from 'components/Board/QuickSheet'
import QuickScheduler from 'components/Board/QuickScheduler'
import { color } from 'theme'

export const TableContext = createContext()

const msgColors = {
  'msgInfo': color.yellow,
  'msgWarning': color.salmon
}

export const BodyView = () => (
  <TableContext.Consumer>
    { ({ title, subtitle, model, viewType, records, activeRecord, searchRecords,
      onChangeView, activeSearch, triggerAction, updateStore, customerId, store,
      actionButtons, parentId, children, ctxView, filters, fieldName,
      handleFilter, context, sortable }) => {
      switch (viewType) {
        case 'list':
          return (
            <QuickTable
              filters={filters}
              handleFilter={handleFilter}
              model={model}
              ctxView={ctxView}
              context={context}
              sortable={sortable}
              activeSearch={activeSearch}
              records={records}
              searchRecords={searchRecords}
              actionButtons={actionButtons}
              updateStore={updateStore}
              onChangeView={onChangeView} />
          )
        case 'form':
          return (
            <QuickForm
              model={model}
              viewType={viewType}
              fieldName={fieldName}
              activeRecord={activeRecord}
              title={title}
              ctxView={ctxView}
              context={context}
              subtitle={subtitle}
              customerId={customerId}
              parentId={parentId}
              triggerAction={triggerAction}
              updateStore={updateStore} />
          )
        case 'webform':
          return (
            <QuickForm
              model={model}
              viewType={viewType}
              activeRecord={activeRecord}
              title={title}
              ctxView={ctxView}
              subtitle={subtitle}
              customerId={customerId}
              parentId={parentId}
              triggerAction={triggerAction}
              updateStore={updateStore} />
          )
        case 'calendar':
          return (
            <QuickScheduler
              filters={filters}
              handleFilter={handleFilter}
              model={model}
              ctxView={ctxView}
              context={context}
              activeSearch={activeSearch}
              records={records}
              searchRecords={searchRecords}
              onChangeView={onChangeView} />
          )
        case 'sheet':
          return (
            <QuickSheet
              filters={filters}
              handleFilter={handleFilter}
              model={model}
              ctxView={ctxView}
              activeSearch={activeSearch}
              records={records}
              searchRecords={searchRecords}
              onChangeView={onChangeView} />
          )
        default:
          return React.cloneElement(children, {
            customerId: customerId,
            activeRecord: activeRecord
          })
      }
    }}
  </TableContext.Consumer>
)

export const Buttons = () => (
  <TableContext.Consumer>
    {
      ({ buttons }) => (
        <Grid.Column style={styles.colButtons}>
          {buttons.map((button, i) => (
            <Button
              basic
              key={i}
              onClick={button.onClick}
              color={button.color}
              style={styles.button}>
              { button.icon?
                  <Icon name={button.icon} style={{margin: 'auto'}} />
                 : <FM id={`board.button_${button.label}`} />
              }
            </Button>
          ))}
        </Grid.Column>
      )
    }
  </TableContext.Consumer>
)

export const HeaderView = () => (
  <TableContext.Consumer>
    {
      ({ title, buttons, model, viewType, msg, subtitle, styled }) => (
        <Grid>
          <Grid.Row columns={16} style={styled.colHeader} stretched>
            <Grid.Column mobile={8} tablet={8} computer={8}>
              <p style={styled.title}>{ <FM id={model} />}</p>
            </Grid.Column>
            {
              subtitle &&
                <Grid.Row style={styled.rowHeader}>
                  <Grid.Column>
                    <p style={styled.subtitle}>{subtitle}</p>
                  </Grid.Column>
                </Grid.Row>
            }
            <Grid.Column mobile={8} tablet={8} computer={8}>
              { buttons && buttons.length > 0?
                <Buttons buttons={buttons} />
                : null
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }
  </TableContext.Consumer>
)

export const MessageSection = () => (
  <TableContext.Consumer>
    {
      ({ messageCtx }) => (
        messageCtx && messageCtx.msg &&
          <Grid.Column width={16} style={getStyleMessage(messageCtx.type)}>
            <p style={styles.msgText}>{<FM id={messageCtx.msg} />}</p>
          </Grid.Column>
      )
    }
  </TableContext.Consumer>
)

function getStyleMessage (type) {
  return {
    backgroundColor: msgColors[type],
    height: 60,
    marginLeft: 0,
    marginRight: 0,
    display: 'flex',
    lineHeight: 60,
    alignItems: 'center'
  }
}

const styles = {
  msgText: {
    color: 'white',
    fontSize: '16px',
    paddingLeft: '20px'
  },
  rowHeader: {
    height: 50,
    marginTop: 0,
    marginBottom: 10
  },
  colHeader: {
    paddingBottom: 10
  },
  colButtons: {
    paddingBottom: 10
  },
  button: {
    marginRight: 20
  }
}


export const Container = ({ children }) => [children]
