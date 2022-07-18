import * as dotenv from 'dotenv'
import { app } from './app'
import { MySQL } from './Core/Database/MySQL'

dotenv.config()

app.set('port', process.env.APP_PORT || 3000)

app.listen(app.get('port'), async () => {
  console.info(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )

  await new MySQL().createDataSource(
    process.env.MYSQL_HOST,
    parseInt(process.env.MYSQL_PORT),
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS
  )
})
