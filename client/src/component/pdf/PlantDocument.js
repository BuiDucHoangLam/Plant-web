import React from 'react'
import {Document,Page,Text,View,Image,StyleSheet} from '@react-pdf/renderer'
import {Table,TableHeader,TableCell,TableBody,DataTableCell} from '@david.kucsai/react-pdf-table'

const PlantDocument = ({specie}) => {
  return (
    <Document>
      <Page>
        <Text>Plant Document</Text>
      </Page>
    </Document>
  )
}

export default PlantDocument
