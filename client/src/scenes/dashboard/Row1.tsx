import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material';
import React, {useMemo} from 'react'
import { AreaChart, Area,BarChart, Bar, XAxis, YAxis, LineChart, Line,CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';



const Row1 = () => {
  const {palette} = useTheme();
  const {data} = useGetKpisQuery();
  console.log(data, 'data');

  const revenueExpenses = useMemo(() => {
    return (
      data && data[0].monthlyData.map(({month, revenue, expenses}) =>{
        return {
          name: month.substring(0,3),
          revenue: revenue,
          expenses: expenses,
        }
      })
    )
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data && data[0].monthlyData.map(({month, revenue, expenses}) =>{
        return {
          name: month.substring(0,3),
          revenue: ` ${revenue}`,
          profit: `${(revenue - expenses).toFixed(2)}`
        }
      })
    )
  }, [data]);

  const revenue = useMemo(() => {
    return (
      data && data[0].monthlyData.map(({month, revenue}) =>{
        return {
          name: month.substring(0,3),
          revenue: ` ${revenue}`,
          
        }
      })
    )
  }, [data]);




  
  return (
    <>

      <DashboardBox gridArea="a">
        <BoxHeader title="Revenue and Expenses" 
        subtitle="Top Line represents revenue, Bottom Line represents expenses"
        sideText="+8%"
        />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={revenueExpenses}
          margin={{
            top: 10,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <defs>
            <linearGradient id='colorRevenue' x1="0" y1="0" x2="0" y2="1">
            <stop 
            offset="5%" 
            stopColor={palette.primary[300]}
            stopOpacity={0.5}
            />
            <stop 
            offset="95%" 
            stopColor={palette.primary[300]}
            stopOpacity={0}
            />
            </linearGradient>
            <linearGradient id='colorExpenses' x1="0" y1="0" x2="0" y2="1">
            <stop 
            offset="5%" 
            stopColor={palette.primary[300]}
            stopOpacity={0.5}
            />
            <stop 
            offset="95%" 
            stopColor={palette.primary[300]}
            stopOpacity={0}
            />
            </linearGradient>
          </defs>
          <XAxis tickLine={false} style={{fontSize: '10px'}} dataKey="name" />
          <YAxis
          tickLine={false}
          axisLine={{strokeWidth: "0"}}
          domain={[8000, 23000]}
           style={{fontSize: '10px'}} 
           
           />
          <Tooltip  formatter={(v) => `$${v}`}/>
          <Area type="monotone" 
          dataKey="revenue" 
          dot= {true}
          stroke={palette.primary.main} 
          fillOpacity={1}
          fill="url(#colorRevenue)" />

          <Area type="monotone" 
          dataKey="expenses" 
          dot= {true}
          stroke={palette.primary.main} 
          fillOpacity={1}
          fill="url(#colorExpenses)" />
        </AreaChart>
      </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="b">
      <BoxHeader title="Profit and Revenue" 
        subtitle="Top Line represents profits, Bottom Line represents revenue"
        sideText="+8%"
        />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={revenueProfit}
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
          <Legend height={20} wrapperStyle={{
            margin: '0 0 10px 0'
          }} />
          <Line
          yAxisId="left"
           type="monotone" 
          dataKey="profit" 
          stroke={palette.tertiary[500]} 
          />

          <Line
          yAxisId="right"
          type="monotone" 
          dataKey="revenue" 
          stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c">
      <BoxHeader title="Revenue month by month" 
        subtitle="Graph representing the revenue month by month"
        sideText="+8%"
        />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={revenue}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 58,
          }}
        >
          <defs>
          <linearGradient id='colorRevenue' x1="0" y1="0" x2="0" y2="1">
            <stop 
            offset="5%" 
            stopColor={palette.primary[300]}
            stopOpacity={0.8}
            />
            <stop 
            offset="95%" 
            stopColor={palette.primary[300]}
            stopOpacity={0}
            />
            </linearGradient>
          </defs>
             <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis dataKey="name" 
          axisLine={false}
          tickLine={false}
          style={{fontSize: '10px'}}
          />
          <YAxis
             axisLine={false}
             tickLine={false}
             style={{fontSize: '10px'}} />
          <Tooltip  formatter={(v) => `$${v}`}/>
          <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          
        </BarChart>
      </ResponsiveContainer>
      </DashboardBox>
      
    </>
  )
}

export default Row1