import DashboardBox from '@/components/DashboardBox'
import BoxHeader from '@/components/BoxHeader';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import React, {useMemo} from 'react'
import { useTheme } from '@mui/material';
import {Box, Typography} from '@mui/material';
import { PieChart, Pie, XAxis, Cell, YAxis, LineChart, 
        Line,CartesianGrid, Tooltip, ResponsiveContainer,
        ScatterChart, Scatter, ZAxis} from 'recharts';
import FlexBetween from '@/components/FlexBetween';

const pieData = [
  {name: "Group A", value: 600},
  {name: "Group B", value: 400}
]

const Row2 = () => {
  const {palette} = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]]
  const {data: operationalData} = useGetKpisQuery();
  const {data: productData}  = useGetProductsQuery();
  console.log(productData)

  const operationalExpenses = useMemo(() => {
    return (
      operationalData && 
      operationalData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses}) =>{
        return {
          name: month.substring(0,3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses


        }
      })
      
    )
  },  [operationalData])

  const productExpenseData = useMemo(() => {
    return (
      productData && 
      productData.map(({_id, price, expense}) =>{
        return {
         id: _id,
         price: price,
         expense: expense


        }
      })
      
    )
  },  [productData])
  return (
    <>

      <DashboardBox gridArea="d">
      <BoxHeader title="Operational vs Non-Operational Expenses" 
        sideText="+8%"
        />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={operationalExpenses}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
           <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis tickLine={false} style={{fontSize: '10px'}} dataKey="name" />
          <YAxis
          yAxisId="left"
          orientation='left'
          tickLine={false}
          axisLine={false}
           style={{fontSize: '10px'}} 
           
           />
          <YAxis
          yAxisId="right"
          orientation="right" 
          tickLine={false}
          axisLine={false}
           style={{fontSize: '10px'}} 
           
           />
          <Tooltip formatter={(v) => `$${v}`} />
        
          <Line
          yAxisId="left"
           type="monotone" 
          dataKey="Non Operational Expenses" 
          stroke={palette.tertiary[500]} 
          />

          <Line
          yAxisId="right"
          type="monotone" 
          dataKey="Operational Expenses" 
          stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e">
      <BoxHeader title="Compaigns and Targets" 
        sideText="+8%"
        />
        <FlexBetween mt='0.25rem' gap='1.25rem' pr='1rem'>
      <PieChart 
      width={110}
       height={100}
       margin={{
        top: 0,
        right: -10,
        left: 10,
        bottom: 0,
      }}

      >
        <Pie
        stroke='none'
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} 
            fill={pieColors[index]} />
          ))}
        </Pie>
      </PieChart>
       
       <Box ml='-0.7rem' flexBasis="40%" textAlign='center'>
        <Typography variant='h5'>Target Sales</Typography>
        <Typography m='0.3rem' variant='h3' color={palette.primary[300]}> 83</Typography>
        <Typography variant='h6'>
          Finance goal of a campaign that is desired.
        </Typography>
     
       </Box>
       <Box flexBasis="40%">
        <Typography variant='h5'>Loses in Revenue</Typography>
        <Typography variant='h6'>Loses are down by 25%</Typography>
       
     
        <Typography mt='0.2rem' variant='h5'>Profits in Revenue</Typography>
        <Typography variant='h6'>Profis are up by 35%</Typography>
       
     
       </Box>
       

  
      </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
      <BoxHeader title="Product Prices vs Expenses" sideText="8%"/>
      <ResponsiveContainer width="100%" height="100%">
       
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: -10,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]} />
          <XAxis
           type="number" 
           dataKey="price" 
           name="price" 
           axisLine={false}
           tickLine={false}
           style={{fontSize: '10px'}}
           tickFormatter={(v) => `$${v}`}
            />

          <YAxis
           type="number" 
           dataKey="expense" 
           name="expense" 
           axisLine={false}
           tickLine={false}
           style={{fontSize: '10px'}}
           tickFormatter={(v) => `$${v}`}
            />
             <ZAxis type='number' range={[20]}/>
          <Tooltip formatter={(v) => `$${v}`} />
          <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
        </ScatterChart>
      </ResponsiveContainer>
      </DashboardBox>
      
    </>
  )
}

export default Row2