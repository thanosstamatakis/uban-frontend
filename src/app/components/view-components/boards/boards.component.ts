import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from '@models/board.model';
import { Column } from '@models/column.model';
import { SocketioService } from '@services/socketio/socketio.service';
import { ActivatedRoute } from '@angular/router';
import { first, take, last } from 'rxjs/operators';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements AfterViewInit {
  teamId: any;
  board: Board = new Board('Test Board', [
    new Column('Ideas', ['Some random idea', 'This is another random idea', 'build an awesome application']),
    new Column('Research', ['Lorem ipsum', 'foo', "This was in the 'Research' column"]),
    new Column('Todo', ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']),
    new Column('Done', ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']),
  ]);
  teamData: unknown;
  @ViewChildren('columns') boardHTMLElements: QueryList<any>;
  @ViewChildren('cards') cardContainerHTMLElements: QueryList<any>;
  cardHTMLElements: Array<any> = [];

  constructor(private _webSocket: SocketioService, private _route: ActivatedRoute) {
    this._route.paramMap.subscribe((params) => {
      this.teamId = params.get('id');

      this._webSocket.join(this.teamId);
      this._webSocket.emit('message', {
        room: this.teamId,
        message: 'Hey guys',
      });
      this._webSocket.listen('message').subscribe((message) => {
        console.log(message);
      });

      this._webSocket.listen('board').subscribe((board) => {
        console.log('New board data:', board);
        let updatedBoard = new Board('Name', []);
      });
    });

    console.log(this.board);
  }

  ngAfterViewInit() {
    // If a new column is added, focus on the title
    this.boardHTMLElements.changes.subscribe((change) => {
      let newColInput: HTMLElement = change.last.nativeElement.children[0].children[0];
      newColInput.focus();
    });
    this.cardContainerHTMLElements.changes.subscribe((change) => {
      this.cardHTMLElements = change._results.map((result) =>
        Array.prototype.slice.call(result.nativeElement.children, 0, result.nativeElement.children.length - 1)
      );
    });
  }

  addNewColumn() {
    let column = new Column('New Column', []);
    this.board.columns.push(column);
  }

  addNewTask(columnIndex) {
    this.board.columns[columnIndex].tasks.push('New Task');
    this.cardContainerHTMLElements.changes.pipe(take(1)).subscribe((change) => {
      this.cardHTMLElements = change._results.map((result) =>
        Array.prototype.slice.call(result.nativeElement.children, 0, result.nativeElement.children.length - 1)
      );
      let columnElements = this.cardHTMLElements[columnIndex];
      let lastCardElement = columnElements[columnElements.length - 1];
      lastCardElement.children[0].focus();
    });
  }

  // Handle drag and drop events from the Angular CDK
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.group('Change in same container event');
      console.log('Previous container data:', event.previousContainer.data);
      console.log('Container data:', event.container.data);
      console.log('Previous index:', event.previousIndex);
      console.log('Current index:', event.currentIndex);
      console.groupEnd();
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      console.group('Change container event');
      console.log('Previous container data:', event.previousContainer.data);
      console.log('Container data:', event.container.data);
      console.log('Previous index:', event.previousIndex);
      console.log('Current index:', event.currentIndex);
      console.groupEnd();

      console.log(this.board);
    }
  }
}
