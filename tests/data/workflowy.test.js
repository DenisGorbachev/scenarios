import { fetchWorkflowy } from '../../data/workflowy'
import Point from '../../lib/Point'
import fs from 'fs'

xit('downloads Workflowy structure', async () => {
  const secret = require('../../storytailor.secret.config')
  const result = await fetchWorkflowy(secret.workflowy)

  console.log('result ', result );
  fs.writeFileSync(`${__dirname}/__fixtures__/projectTreeData.json`, JSON.stringify(result.projectTreeData, null, 2))
})
