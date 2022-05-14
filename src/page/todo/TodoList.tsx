import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

interface Task {
  id: number,
  title: string,
  done: boolean,
}

export const TodoList = () => {

  const [title, setTitle] = useState<string>('');

  const [tasks, setTasks] = useState<Task[]>([
    {id: 1, title: 'Task 1', done: false},
    {id: 2, title: 'Task 2', done: false},
    {id: 3, title: 'Task 3', done: false},
    {id: 4, title: 'Task 4', done: false},
    {id: 5, title: 'Task 5', done: false},
  ]);

  const addTask = (title: string) => {
    setTasks((todos) => (
      [
        ...todos,
        {
          id: todos.length + 1,
          title: title,
          done: false,
        }
      ]
    ));
  }

  const markDone = (task: Task) => {
    setTasks((tasks) => {
      return tasks.map<Task>((value) => {

        if (task.id !== value.id) {
          return value;
        }

        return {
          ...value,
          done: !value.done
        }
      })
    });
  }

  const sortTask = (a: Task, b: Task) => {
    if (!a.done && !b.done) {
      return a.id < b.id ? -1 : 1;
    }

    if (a.done) {
      return 1;
    }

    if (b.done) {
      return -1;
    }

    throw new Error('Order not defined');
  }

  return (
    <Grid>
      <Input onChange={(event) => setTitle(event.target.value)}/>
      <Button onClick={() => addTask(title)}>Add</Button>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {tasks.sort(sortTask).map((task) => {
          const labelId = `checkbox-list-label-${task}`;

          return (
            <ListItem
              key={task.title}
              disablePadding
            >
              <ListItemButton role={undefined} onClick={() => markDone(task)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.done}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={task.title} style={{textDecoration: task.done ? 'line-through' : 'none'}} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}
