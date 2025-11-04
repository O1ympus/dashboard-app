import { model, models, Schema } from 'mongoose'

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
  },
  { _id: true }
)

const columnSchema = new Schema(
  {
    title: { type: String, required: true },
    tasks: {
      type: [taskSchema],
      default: [],
    },
  },
  { _id: false }
)

const DashboardSchema = new Schema(
  {
    name: { type: String, required: true },
    columns: {
      type: [columnSchema],
      default: [
        { title: 'ToDo', tasks: [] },
        { title: 'In Progress', tasks: [] },
        { title: 'Done', tasks: [] },
      ],
    },
  },
  { timestamps: true }
)

export const Dashboard = models.Dashboard || model('Dashboard', DashboardSchema)
