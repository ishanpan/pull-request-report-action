import * as core from '@actions/core'
import * as github from '@actions/github'
import { GetPullRequestData } from './GitHubCliHelper'
import axios from 'axios';
// export const SanitizeMarkdownComment = (comment: string): string => {
//   return comment.replaceAll(/<!--/g, '&lt;!--').replaceAll(/-->/g, '--&gt;')
// }

// const CreatePRCommentFile = (raw_json_data: string, commentText: string, include_raw_data: boolean): string => {
//   // generate random file name
//   const fileName = Math.random().toString(36).substring(7) + '.md'
//   let jsonString = ''

//   if (include_raw_data) {
//     jsonString = raw_json_data
//   }

//   // write report string to file
//   fs.writeFileSync(fileName, `<!-- ${jsonString} -->\n${commentText}`)

//   return `${process.env.GITHUB_WORKSPACE || './'}/${fileName}`
// }

// const GenerateReport = (
//   activeConfigValues: ReportConfigurationEntry[],
//   pullRequestDataModel: IPullRequest,
// ): IReport => {
//   const report = new Report()
//   report.Entries = activeConfigValues
//   report.Description = 'Test report'
//   report.Id = pullRequestDataModel.id.toString()
//   return report
// }

// const IsConfigValueYes = (configValue: string): boolean => {
//   return configValue.trim().toLowerCase() === 'yes'
// }

export const run = async (): Promise<number> => {
  // take care that action is running only in PR context
  if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
    core.setFailed('Action is running outside of PR context')
    return 0
  }

  // const activeConfigValues = GetActiveMeasures(ReportConfigurationTable)

  // get PR data from github cli
  // const cliPullRequestData = await GetPullRequestData(github.context.issue.number)
  // const cliPullRequestDataAsString = SanitizeMarkdownComment(JSON.stringify(cliPullRequestData))

  const GetPullRequestDataFiles = await GetPullRequestData(github.context.issue.number)
  // const cliPullRequestDataFilesAsString = SanitizeMarkdownComment(JSON.stringify(cliPullRequestData))

  const yuyu =  GetPullRequestDataFiles as {
    "files":[]
  }
  const files = yuyu.files
   files.forEach(async function (arrayItem: { path:string}) {
    let x = arrayItem.path
    const data  = {
      name: x
    }
    const response = await axios.post("http://130.141.134.169:8000/getfunctionalarea",data);
    console.log(response.data);
  })
  // transform PR data to a typed model
  // const pullRequestDataModel = PullRequest.CreateFromJson(cliPullRequestData)
  // // generate the report of the typed model
  // const generator = new ReportGenerator()
  // const report = GenerateReport(activeConfigValues, pullRequestDataModel)
  // // create report
  // report.Description = inputsFromWorkflow.ReportTitle as string
  // const reportAsString = generator.Generate(pullRequestDataModel, report)

  // const commentPath = CreatePRCommentFile(
  //   cliPullRequestDataAsString,
  //   reportAsString,
  //   IsConfigValueYes(inputsFromWorkflow.IncludeRawDataAsMarkdownComment as string),
  // )
  // if (IsConfigValueYes(inputsFromWorkflow.AddPrReportAsComment as string)) {
  //   await AddCommentToPR(commentPath, pullRequestDataModel.id)
  // }

  // const jsonPath = commentPath.replace(/\.md$/, '.json')
  // fs.writeFileSync(jsonPath, cliPullRequestDataAsString)
  // core.setOutput('json_report_path', jsonPath)

  return 0
}
