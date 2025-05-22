import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { ChevronDown, Eye, Code, Copy, RotateCcw, X } from "lucide-react";

const CustomerDemographicsDashboard = () => {
  const [expandedBlocks, setExpandedBlocks] = React.useState({});
  const [showCode, setShowCode] = React.useState(false);

  // Age distribution data from actual query results
  const ageData = [
    { ageGroup: "18-25", customers: 7 },
    { ageGroup: "26-35", customers: 877 },
    { ageGroup: "36-45", customers: 998 },
    { ageGroup: "46-55", customers: 982 },
    { ageGroup: "56-65", customers: 984 },
    { ageGroup: "Over 65", customers: 1539 },
  ];

  // Gender distribution data from actual query results
  const genderData = [
    { name: "Male", value: 52, color: "#3B82F6" },
    { name: "Female", value: 46, color: "#10B981" },
    { name: "IND", value: 2, color: "#F59E0B" },
    { name: "Non Binary", value: 2, color: "#EF4444" },
  ];

  // Geographic distribution from actual query results
  const geoData = [
    { state: "TX", customers: 207 },
    { state: "CA", customers: 179 },
    { state: "PA", customers: 176 },
    { state: "NY", customers: 158 },
    { state: "OH", customers: 139 },
    { state: "IL", customers: 120 },
    { state: "VA", customers: 109 },
    { state: "MO", customers: 99 },
    { state: "FL", customers: 97 },
    { state: "KY", customers: 95 },
  ];

  const toggleBlock = (blockId) => {
    setExpandedBlocks((prev) => ({
      ...prev,
      [blockId]: !prev[blockId],
    }));
  };

  const CodeBlock = ({ children, language = "R", blockId, responseData }) => (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-blue-300 text-sm font-mono">{language}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 cursor-pointer transition-transform duration-300 ease-in-out ${
            expandedBlocks[blockId] ? "rotate-180" : ""
          }`}
          onClick={() => toggleBlock(blockId)}
        />
      </div>
      <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
        {children}
      </pre>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expandedBlocks[blockId]
            ? "max-h-96 opacity-100 mt-3"
            : "max-h-0 opacity-0"
        }`}
      >
        {responseData && (
          <>
            <div className="border-t border-gray-600 mb-3"></div>
            <div className="text-gray-400 text-xs mb-2">Response</div>
            <div className="max-h-80 overflow-y-auto">
              <pre className="text-green-300 text-xs font-mono whitespace-pre-wrap bg-gray-900 p-2 rounded">
                {responseData}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-1/2 bg-gray-900 text-white p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">
            Customer Demographics Insights from Teradata
          </h1>
        </div>

        {/* User Query */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-semibold">
              T
            </div>
            <div className="flex-1">
              <p className="text-gray-200 text-sm leading-relaxed">
                What useful insights can you give me regarding the demographics
                of customers based on the customer data table in Teradata? Give
                only three insights with associated plots. Don't explain the
                insights in detail.
              </p>
            </div>
          </div>
        </div>

        {/* Response Content */}
        <div className="space-y-4">
          <p className="text-gray-200">
            I'll provide three key insights about customer demographics from the
            Teradata customer data table, along with visualizations for each
            insight.
          </p>

          <p className="text-gray-200">
            First, let me examine the available customer data to understand what
            demographic information is available.
          </p>

          <CodeBlock
            blockId="read_database_list"
            responseData={`Request{}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_database_list",
    "total_count": 70,
    "databases": 25,
    "users": 45
  },
  "results": [
    {
      "DatabaseName": "TDaaS_CloudRouterManaged1",
      "DBType": "User",
      "CommentString": "As-A-Service : QueryFabric COG management user"
    },
    {
      "DatabaseName": "Sys_Calendar",
      "DBType": "User",
      "CommentString": "None"
    },
    {
      "DatabaseName": "C360F_OUT",
      "DBType": "DataBase",
      "CommentString": "None"
    }
  ]
}`}
          >
            read_database_list
          </CodeBlock>

          <p className="text-gray-200">
            Let me look for databases that might contain customer data.
          </p>

          <CodeBlock
            blockId="read_table_list"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_table_list",
    "database": "C360F_OUT",
    "table_count": 21
  },
  "results": [
    {
      "TableName": "REF_GOLDEN_CUST_UI"
    },
    {
      "TableName": "REF_CUSTOMER_UI"
    },
    {
      "TableName": "REF_TRAITS_UI"
    },
    {
      "TableName": "REF_LOYALTY_UI"
    }
  ]
}`}
          >
            read_table_list
          </CodeBlock>

          <p className="text-gray-200">
            I can see several customer-related tables in the C360F_OUT database.
            Let me examine the customer table structure:
          </p>

          <CodeBlock
            blockId="read_column_description_customer"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`,
  \`obj_name\`: \`REF_CUSTOMER_UI\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_column_description",
    "database": "C360F_OUT",
    "object": "REF_CUSTOMER_UI",
    "column_count": 11
  },
  "results": [
    {
      "TableName": "REF_CUSTOMER_UI",
      "ColumnName": "gender",
      "CType": "None"
    },
    {
      "TableName": "REF_CUSTOMER_UI",
      "ColumnName": "age",
      "CType": "None"
    },
    {
      "TableName": "REF_CUSTOMER_UI",
      "ColumnName": "cnsmr_id",
      "CType": "None"
    }
  ]
}`}
          >
            read_column_description
          </CodeBlock>

          <p className="text-gray-200">
            Let me also check the traits table for more demographic information:
          </p>

          <CodeBlock
            blockId="read_column_description_traits"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`,
  \`obj_name\`: \`REF_TRAITS_UI\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_column_description",
    "database": "C360F_OUT",
    "object": "REF_TRAITS_UI",
    "column_count": 4
  },
  "results": [
    {
      "TableName": "REF_TRAITS_UI",
      "ColumnName": "trait_value",
      "CType": "None"
    },
    {
      "TableName": "REF_TRAITS_UI",
      "ColumnName": "cnsmr_id",
      "CType": "None"
    }
  ]
}`}
          >
            read_column_description
          </CodeBlock>

          <p className="text-gray-200">
            Let me get some sample data from the customer table:
          </p>

          <CodeBlock
            blockId="read_table_preview_customer"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`,
  \`table_name\`: \`REF_CUSTOMER_UI\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_table_preview",
    "database": "C360F_OUT",
    "table_name": "C360F_OUT.REF_CUSTOMER_UI",
    "sample_size": 5
  },
  "results": [
    {
      "cnsmr_id": "2875",
      "first_name": "An",
      "last_name": "Chai",
      "gender": "Male",
      "age": "54"
    },
    {
      "cnsmr_id": "9523",
      "first_name": "Eduardo",
      "last_name": "Silva",
      "gender": "Male",
      "age": "38"
    }
  ]
}`}
          >
            read_table_preview
          </CodeBlock>

          <p className="text-gray-200">Now I'll examine the traits data:</p>

          <CodeBlock
            blockId="read_table_preview_traits"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`,
  \`table_name\`: \`REF_TRAITS_UI\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_table_preview",
    "database": "C360F_OUT",
    "table_name": "C360F_OUT.REF_TRAITS_UI",
    "sample_size": 5
  },
  "results": [
    {
      "trait_desc": "Favorite",
      "trait_value": "NEV",
      "cnsmr_id": "9372"
    },
    {
      "trait_desc": "Score",
      "trait_value": "LIK",
      "cnsmr_id": "9256"
    }
  ]
}`}
          >
            read_table_preview
          </CodeBlock>

          <p className="text-gray-200">
            Let me also check if there's any income, education, or occupation
            data in the loyalty or golden customer tables:
          </p>

          <CodeBlock
            blockId="read_column_description_golden"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`,
  \`obj_name\`: \`REF_GOLDEN_CUSTOMER_UI\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_column_description",
    "database": "C360F_OUT",
    "object": "REF_GOLDEN_CUSTOMER_UI",
    "column_count": 11
  },
  "results": [
    {
      "TableName": "REF_GOLDEN_CUSTOMER_UI",
      "ColumnName": "ADDR_TYPE_CD",
      "CType": "None"
    },
    {
      "TableName": "REF_GOLDEN_CUSTOMER_UI",
      "ColumnName": "StateCode",
      "CType": "None"
    },
    {
      "TableName": "REF_GOLDEN_CUSTOMER_UI",
      "ColumnName": "CityName",
      "CType": "None"
    }
  ]
}`}
          >
            read_column_description
          </CodeBlock>

          <CodeBlock
            blockId="read_column_description_loyalty"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`,
  \`obj_name\`: \`REF_LOYALTY_UI\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_column_description",
    "database": "C360F_OUT",
    "object": "REF_LOYALTY_UI",
    "column_count": 5
  },
  "results": [
    {
      "TableName": "REF_LOYALTY_UI",
      "ColumnName": "prog_name",
      "CType": "None"
    },
    {
      "TableName": "REF_LOYALTY_UI",
      "ColumnName": "cnsmr_id",
      "CType": "None"
    },
    {
      "TableName": "REF_LOYALTY_UI",
      "ColumnName": "level",
      "CType": "None"
    }
  ]
}`}
          >
            read_column_description
          </CodeBlock>

          <p className="text-gray-200">Now I'll check for location data:</p>

          <CodeBlock
            blockId="read_table_preview_golden"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`,
  \`table_name\`: \`REF_GOLDEN_CUSTOMER_UI\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_table_preview",
    "database": "C360F_OUT",
    "table_name": "C360F_OUT.REF_GOLDEN_CUSTOMER_UI",
    "sample_size": 5
  },
  "results": [
    {
      "golden_id": "4963",
      "CUST_ID": "8639",
      "FRST_NAME": "Bruna",
      "LAST_NAME": "Fernandes",
      "ADDR_TYPE_CD": "None",
      "address": "None"
    }
  ]
}`}
          >
            read_table_preview
          </CodeBlock>

          <p className="text-gray-200">
            Let me check the postal address table for more complete location
            data:
          </p>

          <CodeBlock
            blockId="read_table_preview_postal"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`,
  \`table_name\`: \`REF_POSTAL_ADDR_UI\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_table_preview",
    "database": "C360F_OUT",
    "table_name": "C360F_OUT.REF_POSTAL_ADDR_UI",
    "sample_size": 5
  },
  "results": [
    {
      "addr_line_1": "1022 North U.S. Highway 1 MO Puxico 63960",
      "city": "Puxico",
      "state": "MO",
      "zip_cd": "63960",
      "addr_type": "HOME"
    }
  ]
}`}
          >
            read_table_preview
          </CodeBlock>

          <p className="text-gray-200">
            Let me check the loyalty table for customer segment information:
          </p>

          <CodeBlock
            blockId="read_table_preview_loyalty"
            responseData={`Request{
  \`db_name\`: \`C360F_OUT\`,
  \`table_name\`: \`REF_LOYALTY_UI\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "read_table_preview",
    "database": "C360F_OUT",
    "table_name": "C360F_OUT.REF_LOYALTY_UI",
    "sample_size": 5
  },
  "results": [
    {
      "cnsmr_id": "3487",
      "card_no": "601707",
      "level": "Medium",
      "prog_name": "Fuel reward"
    }
  ]
}`}
          >
            read_table_preview
          </CodeBlock>

          <p className="text-gray-200">
            Now I'll run some queries to get data for my insights:
          </p>

          <CodeBlock
            blockId="execute_read_query_gender"
            language="SQL"
            responseData={`Request{
  \`sql\`: \`
SELECT gender, COUNT(*) as customer_count 
FROM C360F_OUT.REF_CUSTOMER_UI 
GROUP BY gender 
ORDER BY customer_count DESC
\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "execute_read_query",
    "row_count": 4
  },
  "results": [
    {
      "gender": "Male",
      "customer_count": "2697"
    },
    {
      "gender": "Female",
      "customer_count": "2484"
    },
    {
      "gender": "IND",
      "customer_count": "121"
    },
    {
      "gender": "Non Binary",
      "customer_count": "85"
    }
  ]
}`}
          >
            execute_read_query
          </CodeBlock>

          <CodeBlock
            blockId="execute_read_query_age"
            language="SQL"
            responseData={`Request{
  \`sql\`: \`
SELECT 
  CASE 
    WHEN age <= 18 THEN 'Under 18'
    WHEN age > 18 AND age <= 25 THEN '18-25'
    WHEN age > 25 AND age <= 35 THEN '26-35' 
    WHEN age > 35 AND age <= 45 THEN '36-45'
    WHEN age > 45 AND age <= 55 THEN '46-55'
    WHEN age > 55 AND age <= 65 THEN '56-65'
    WHEN age > 65 THEN 'Over 65'
    ELSE 'Unknown'
  END as age_group,
  COUNT(*) as customer_count
FROM C360F_OUT.REF_CUSTOMER_UI
GROUP BY age_group
ORDER BY 
  CASE age_group
    WHEN 'Under 18' THEN 1
    WHEN '18-25' THEN 2
    WHEN '26-35' THEN 3
    WHEN '36-45' THEN 4
    WHEN '46-55' THEN 5
    WHEN '56-65' THEN 6
    WHEN 'Over 65' THEN 7
    ELSE 8
  END
\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "execute_read_query",
    "row_count": 6
  },
  "results": [
    {
      "age_group": "18-25",
      "customer_count": "7"
    },
    {
      "age_group": "26-35",
      "customer_count": "877"
    },
    {
      "age_group": "36-45",
      "customer_count": "998"
    },
    {
      "age_group": "46-55",
      "customer_count": "982"
    },
    {
      "age_group": "56-65",
      "customer_count": "984"
    },
    {
      "age_group": "Over 65",
      "customer_count": "1539"
    }
  ]
}`}
          >
            execute_read_query
          </CodeBlock>

          <CodeBlock
            blockId="execute_read_query_state_error"
            language="SQL"
            responseData={`Request{
  \`sql\`: \`
SELECT p.state, COUNT(*) as customer_count
FROM C360F_OUT.REF_POSTAL_ADDR_UI p
WHERE p.state IS NOT NULL
GROUP BY p.state
ORDER BY customer_count DESC
LIMIT 10
\`
}
ResponseError: [Version 20.0.0.28] [Session 4243] [Teradata Database] [Error 3706] Syntax error: expected something between the 'DESC' keyword and the 'LIMIT' keyword.`}
          >
            execute_read_query
          </CodeBlock>

          <p className="text-gray-200">
            Let me correct my query since LIMIT isn't supported in this Teradata
            instance:
          </p>

          <CodeBlock
            blockId="execute_read_query_state"
            language="SQL"
            responseData={`Request{
  \`sql\`: \`
SELECT TOP 10 p.state, COUNT(*) as customer_count
FROM C360F_OUT.REF_POSTAL_ADDR_UI p
WHERE p.state IS NOT NULL
GROUP BY p.state
ORDER BY customer_count DESC
\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "execute_read_query",
    "row_count": 10
  },
  "results": [
    {
      "state": "TX",
      "customer_count": "207"
    },
    {
      "state": "CA",
      "customer_count": "179"
    },
    {
      "state": "PA",
      "customer_count": "176"
    },
    {
      "state": "NY",
      "customer_count": "158"
    }
  ]
}`}
          >
            execute_read_query
          </CodeBlock>

          <CodeBlock
            blockId="execute_read_query_loyalty"
            language="SQL"
            responseData={`Request{
  \`sql\`: \`
SELECT l.level, COUNT(*) as customer_count 
FROM C360F_OUT.REF_LOYALTY_UI l
WHERE l.level IS NOT NULL
GROUP BY l.level
ORDER BY 
  CASE l.level
    WHEN 'Low' THEN 1
    WHEN 'Medium' THEN 2
    WHEN 'Silver' THEN 3
    WHEN 'Gold' THEN 4
    WHEN 'Platinum' THEN 5
    ELSE 6
  END
\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "execute_read_query",
    "row_count": 6
  },
  "results": [
    {
      "level": "Low",
      "customer_count": "684"
    },
    {
      "level": "Medium",
      "customer_count": "657"
    },
    {
      "level": "Silver",
      "customer_count": "736"
    },
    {
      "level": "Gold",
      "customer_count": "736"
    },
    {
      "level": "Platinum",
      "customer_count": "786"
    },
    {
      "level": "HIGH",
      "customer_count": "717"
    }
  ]
}`}
          >
            execute_read_query
          </CodeBlock>

          <CodeBlock
            blockId="execute_read_query_ethnicity"
            language="SQL"
            responseData={`Request{
  \`sql\`: \`
SELECT 
  c.ethnicity, 
  COUNT(*) as customer_count 
FROM C360F_OUT.REF_CUSTOMER_UI c
WHERE c.ethnicity IS NOT NULL
GROUP BY c.ethnicity
ORDER BY customer_count DESC
\`
}
Response{
  "status": "success",
  "metadata": {
    "tool_name": "execute_read_query",
    "row_count": 7
  },
  "results": [
    {
      "ethnicity": "CAU",
      "customer_count": "3962"
    },
    {
      "ethnicity": "BLA",
      "customer_count": "662"
    },
    {
      "ethnicity": "ASI",
      "customer_count": "294"
    },
    {
      "ethnicity": "HIS",
      "customer_count": "246"
    }
  ]
}`}
          >
            execute_read_query
          </CodeBlock>

          <p className="text-gray-200">
            Now I'll create visual insights based on the data:
          </p>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="w-1/2 bg-white overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">
            Customer Demographics Insights
          </h1>
          <div className="flex items-center space-x-2">
            <div
              className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => setShowCode(!showCode)}
            >
              <Eye
                className={`w-4 h-4 ${
                  showCode ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <Code
                className={`w-4 h-4 ${
                  showCode ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm ${
                  showCode ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {showCode ? "Hide Code" : "Show Code"}
              </span>
            </div>
            <RotateCcw className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded cursor-pointer">
              <Copy className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Copy</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <X className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
        </div>
        <div className="p-6 space-y-8">
          {showCode ? (
            // Code View
            <div className="bg-gray-900 rounded-lg p-6 text-white font-mono text-sm overflow-auto max-h-screen">
              <h3 className="text-lg font-semibold mb-4 text-blue-300">
                React Component Code
              </h3>
              <pre className="whitespace-pre-wrap">
                {`import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Demographic insights component
const DemographicInsights = () => {
  // Gender Distribution
  const genderData = [
    { name: 'Male', value: 2697 },
    { name: 'Female', value: 2484 },
    { name: 'Non Binary', value: 85 },
    { name: 'IND', value: 121 }
  ];
  
  // Age Distribution
  const ageData = [
    { name: '18-25', value: 7 },
    { name: '26-35', value: 877 },
    { name: '36-45', value: 998 },
    { name: '46-55', value: 982 },
    { name: '56-65', value: 984 },
    { name: 'Over 65', value: 1539 }
  ];
  
  // Loyalty Tier Distribution
  const loyaltyData = [
    { name: 'Low', value: 684 },
    { name: 'Medium', value: 657 },
    { name: 'Silver', value: 736 },
    { name: 'Gold', value: 736 },
    { name: 'Platinum', value: 786 },
    { name: 'HIGH', value: 717 }
  ];
  
  // Geographic Distribution (Top States)
  const stateData = [
    { name: 'TX', value: 207 },
    { name: 'CA', value: 179 },
    { name: 'PA', value: 176 },
    { name: 'NY', value: 158 },
    { name: 'OH', value: 139 }
  ];
  
  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-bold text-center">Customer Demographics Insights</h1>
      
      {/* Insight 1: Age Distribution */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Insight 1: Customer Age Distribution</h2>
        <p className="mb-4">The majority of our customers are over 65 years old (30%), followed by even distribution across middle age groups.</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Customers" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Insight 2: Gender Distribution */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Insight 2: Customer Gender Distribution</h2>
        <p className="mb-4">Males slightly outnumber females, with a 52:48 ratio excluding non-binary and other gender identifications.</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => \`\${name}: \${(percent * 100).toFixed(0)}%\`}
              >
                {genderData.map((entry, index) => (
                  <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Insight 3: Geographic Distribution */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Insight 3: Top 5 Customer States</h2>
        <p className="mb-4">Texas, California, and Pennsylvania have the highest customer concentration, suggesting targeted regional marketing opportunities.</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stateData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Customers" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DemographicInsights;`}
              </pre>
            </div>
          ) : (
            <div className="p-6 space-y-8">
              {/* Insight 1: Age Distribution */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Insight 1: Customer Age Distribution
                </h2>
                <p className="text-gray-700 mb-6">
                  The majority of our customers are over 65 years old (30%),
                  followed by even distribution across middle age groups.
                </p>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={ageData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="ageGroup"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#666" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#666" }}
                        domain={[0, 1600]}
                        ticks={[0, 400, 800, 1200, 1600]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "none",
                          borderRadius: "8px",
                          color: "white",
                          fontSize: "12px",
                        }}
                        labelStyle={{ color: "#9ca3af" }}
                        formatter={(value, name) => [value, "Customers"]}
                        labelFormatter={(label) => `Age Group: ${label}`}
                      />
                      <Bar
                        dataKey="customers"
                        fill="#8B5CF6"
                        radius={[4, 4, 0, 0]}
                        name="Customers"
                        cursor="pointer"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insight 2: Gender Distribution */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Insight 2: Customer Gender Distribution
                </h2>
                <p className="text-gray-700 mb-6">
                  Males slightly outnumber females, with a 52:48 ratio excluding
                  non-binary and other gender identifications.
                </p>

                <div className="flex justify-center">
                  <div className="w-80 h-80 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          cursor="pointer"
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "none",
                            borderRadius: "8px",
                            color: "white",
                            fontSize: "12px",
                          }}
                          formatter={(value, name) => [`${value}%`, name]}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value, entry) =>
                            `${value}: ${entry.payload.value}%`
                          }
                          wrapperStyle={{
                            fontSize: "12px",
                            paddingTop: "10px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Custom Labels positioned exactly like the original */}
                    <div className="absolute top-16 right-8 text-sm pointer-events-none">
                      <span className="text-blue-600 font-medium">
                        Male: 50%
                      </span>
                    </div>
                    <div className="absolute bottom-16 left-8 text-sm pointer-events-none">
                      <span className="text-green-600 font-medium">
                        Female: 46%
                      </span>
                    </div>
                    <div className="absolute top-20 right-4 text-xs pointer-events-none">
                      <span className="text-yellow-600">IND: 2%</span>
                    </div>
                    <div className="absolute top-24 right-0 text-xs pointer-events-none">
                      <span className="text-red-600">Non Binary: 2%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insight 3: Geographic Distribution */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Insight 3: Customer Geographic Distribution
                </h2>
                <p className="text-gray-700 mb-6">
                  Texas leads with the highest customer concentration (207),
                  followed by California (179) and Pennsylvania (176),
                  indicating strong presence in major population centers.
                </p>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={geoData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="state"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#666" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#666" }}
                        domain={[0, 250]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "none",
                          borderRadius: "8px",
                          color: "white",
                          fontSize: "12px",
                        }}
                        labelStyle={{ color: "#9ca3af" }}
                        formatter={(value, name) => [value, "Customers"]}
                        labelFormatter={(label) => `State: ${label}`}
                      />
                      <Bar
                        dataKey="customers"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                        name="Customers"
                        cursor="pointer"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDemographicsDashboard;
