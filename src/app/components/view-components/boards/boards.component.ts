import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragExit } from '@angular/cdk/drag-drop';
import { Board } from '@models/board.model';
import { Column } from '@models/column.model';
import { User } from '@models/user.model';
import { SocketioService } from '@services/socketio/socketio.service';
import { ActivatedRoute } from '@angular/router';
import { first, take, last, skip } from 'rxjs/operators';
import { Card } from '@models/card.model';
import { Message } from '@models/message.model';
import { scaleUpDownBr, scaleUpDown } from '@helpers/animations';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  // Add socketIoService to providers so that Angular is prevented
  // from creating a singleton for the service
  providers: [SocketioService],
  animations: [scaleUpDownBr, scaleUpDown],
})
export class BoardsComponent implements AfterViewInit, OnInit, OnDestroy {
  teamId: any;
  board: Board;
  // = new Board('Test Board', '1', [
  //   new Column('Ideas', '2', [new Card('Show up', '6')]),
  //   new Column('Research', '3', [new Card('Skrrrrap pap', '7')]),
  //   new Column('Todo', '4', [new Card('Get paid', '8')]),
  //   new Column('Done', '5', [new Card("That's whats up", '9')]),
  // ]);
  teamData: unknown;
  @ViewChildren('columns') boardHTMLElements: QueryList<any>;
  @ViewChild('messageInput', { static: false }) messageInput: any;
  @ViewChildren('cards') cardContainerHTMLElements: QueryList<any>;
  cardHTMLElements: Array<any> = [];
  teamName: any;
  overContainers: any = [];
  chatActive = false;
  unreadMessages = 0;
  userId: string;
  messageForm: FormGroup;
  audio = new Audio('assets/sounds/message.mp3');
  messages: Array<Message> = [
    // {
    //   _id: '1',
    //   team: '5ec80e492061756272be1daa',
    //   sender: '5ebff8f94bc421153a1dd5fd',
    //   body: 'Έλα ρε Θάνο, που είσαι',
    //   seenBy: ['5ebff8f94bc421153a1dd5fd'],
    // },
    // {
    //   _id: '2',
    //   team: '5ec80e492061756272be1daa',
    //   sender: '5ebff8f94bc421153a1dd5fa',
    //   body: 'Τι λέει ρε μαλάκα, πώς πάει?',
    //   seenBy: ['5ebff8f94bc421153a1dd5fd'],
    // },
    // {
    //   _id: '2',
    //   team: '5ec80e492061756272be1daa',
    //   sender: '5ebff8f94bc421153a1dd5fd',
    //   body: 'Τι σκάτα σου συμβαίνει mate?',
    //   seenBy: ['5ebff8f94bc421153a1dd5fd'],
    // },
  ];

  constructor(
    private _webSocket: SocketioService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _auth: AuthService
  ) {
    this.audio.load();
    this.messageForm = _formBuilder.group({
      message: [null, Validators.required],
    });

    this._route.paramMap.subscribe((params) => {
      this.teamId = params.get('id');

      this._webSocket.join(this.teamId);
      // this._webSocket.emit('message', {
      //   room: this.teamId,
      //   message: 'Hey guys',
      // });
      this._webSocket.listen('message').subscribe((message) => {
        this.messages.push(message);
        message.sender !== this.userId ? this.audio.play() : this.userId;
        let unreadIds = this.calculateUnread();
        this.unreadMessages = unreadIds.length;
      });

      this._webSocket.listen('messages').subscribe((messages: Array<Message>) => {
        this.messages = messages;
        console.log(this.messages);
        let unreadIds = this.calculateUnread();
        this.unreadMessages = unreadIds.length;
      });

      this._webSocket.listen('cardUpdated').subscribe((card) => {
        this.board.columns.forEach((col, index) =>
          col._id === card.columnId
            ? this.board.columns[index].cards.map((crd) => (crd._id === card._id ? (crd.name = card.name) : crd))
            : col
        );
      });

      this._webSocket.listen('columnUpdated').subscribe((column) => {
        this.board.columns.forEach((col, index) => {
          if (col._id == column._id) {
            this.board.columns[index].name = column.name;
          }
        });
      });

      this._webSocket.listen('cardIndexChanged').subscribe(({ columnId, oldIndex, newIndex }) => {
        let columnIndex;
        this.board.columns.forEach((col, i) => (col._id === columnId ? (columnIndex = i) : col));
        moveItemInArray(this.board.columns[columnIndex].cards, oldIndex, newIndex);
      });

      this._webSocket.listen('cardPositionChanged').subscribe(({ columnId, prevColId, oldIndex, newIndex }) => {
        let columnIndex;
        let prevColumnIndex;
        this.board.columns.forEach((col, i) => (col._id === prevColId ? (prevColumnIndex = i) : col));
        this.board.columns.forEach((col, i) => (col._id === columnId ? (columnIndex = i) : col));
        transferArrayItem(
          this.board.columns[prevColumnIndex].cards,
          this.board.columns[columnIndex].cards,
          oldIndex,
          newIndex
        );
      });

      this._webSocket.listen('board').subscribe((team) => {
        this.teamName = team.name;
        let board: Board = team.board;
        let columns: Column[] = board.columns;
        this.board = new Board(
          board.name,
          board._id,
          columns.map(
            (column: Column) =>
              new Column(
                column.name,
                column._id,
                column.cards.map(
                  (card: Card) => new Card(card.name, card._id, card.githubId, card.githubProject, card.githubColumn)
                ),
                column.githubId,
                column.githubProject
              )
          ),
          board.githubId
        );
      });
    });
  }

  async ngOnInit() {
    let userData: User = (await this._auth.verifyToken())['userData'];
    this.userId = userData._id;
  }

  ngOnDestroy() {
    this._webSocket.disconnect();
  }

  ngAfterViewInit() {
    // If a new column is added, focus on the title
    // this.boardHTMLElements.changes.pipe(skip(1)).subscribe((change) => {
    //   console.log(change);
    //   console.log(change.length >= this.board.columns.length);
    //   if (change.length >= this.board.columns.length) {
    //     let newColInput: HTMLElement = change.last.nativeElement.children[0].children[0];
    //     newColInput.focus();
    //   }
    // });
    // this.cardContainerHTMLElements.changes.subscribe((change) => {
    //   this.cardHTMLElements = change._results.map((result) =>
    //     Array.prototype.slice.call(result.nativeElement.children, 0, result.nativeElement.children.length - 1)
    //   );
    // });
  }

  addNewColumn() {
    this._webSocket.emit('addColumn', {
      room: this.teamId,
      columnName: 'New Column',
      git: this.board.githubId ? true : false,
      gitProject: this.board.githubId,
      userId: this.userId,
    });
  }

  focusedMessage() {
    let unreadIds = this.calculateUnread();
    if (unreadIds.length > 0) {
      this._webSocket.emit('updateMessageViews', {
        room: this.teamId,
        userId: this.userId,
        messages: unreadIds,
      });
    }
  }

  calculateUnread() {
    let unseenIds = [];
    for (let i = 0; i < this.messages.length; i++) {
      const msg = this.messages[i];
      let unseen = !msg.seenBy.includes(this.userId);
      unseen ? unseenIds.push(msg._id) : unseen;
    }
    return unseenIds;
  }

  sendMessage(message) {
    this._webSocket.emit('message', {
      room: this.teamId,
      sender: this.userId,
      body: message.message,
    });
    this.messageInput.nativeElement.value = '';
  }

  addNewTask(columnIndex, columnId, githubColumnId) {
    this._webSocket.emit('addCard', {
      room: this.teamId,
      columnId: columnId,
      git: this.board.githubId ? true : false,
      githubColumnId: githubColumnId,
      gitProject: this.board.githubId,
      userId: this.userId,
    });
    // this.board.columns[columnIndex].cards.push(new Card('New Card', '2'));
    // this.cardContainerHTMLElements.changes.pipe(take(1)).subscribe((change) => {
    //   this.cardHTMLElements = change._results.map((result) =>
    //     Array.prototype.slice.call(result.nativeElement.children, 0, result.nativeElement.children.length - 1)
    //   );
    //   let columnElements = this.cardHTMLElements[columnIndex];
    //   let lastCardElement = columnElements[columnElements.length - 1];
    //   lastCardElement.children[0].focus();
    // });
  }

  updateColumnName(value: string, id: string, githubId: string) {
    this._webSocket.emit('changeColumnName', {
      room: this.teamId,
      columnId: id,
      name: value,
      git: this.board.githubId ? true : false,
      githubId: githubId,
      userId: this.userId,
    });
  }

  updateCardName(value: string, id: string, columnId: string, githubId: string) {
    this._webSocket.emit('changeCardName', {
      room: this.teamId,
      cardId: id,
      columnId: columnId,
      name: value,
      git: this.board.githubId ? true : false,
      githubId: githubId,
      userId: this.userId,
    });
  }

  // Handle drag and drop events from the Angular CDK
  drop(event: CdkDragDrop<string[]>, colId, githubColumnId) {
    if (event.previousContainer === event.container) {
      this.overContainers = [];
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      let position;
      event.currentIndex == 0
        ? (position = 'top')
        : (position = `after:${event.container.data[event.currentIndex - 1]['githubId']}`);
      this._webSocket.emit('changeCardIndex', {
        room: this.teamId,
        cardId: event.container.data[event.currentIndex]['_id'],
        columnId: colId,
        oldIndex: event.previousIndex,
        newIndex: event.currentIndex,
        position: position,
        git: this.board.githubId ? true : false,
        githubId: event.container.data[event.currentIndex]['githubId'],
        userId: this.userId,
      });
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // console.log(event.previousContainer.data);
      // console.log(this.overContainers[0]);
      let position;
      event.currentIndex == 0
        ? (position = 'top')
        : (position = `after:${event.container.data[event.currentIndex - 1]['githubId']}`);
      this._webSocket.emit('transferCard', {
        room: this.teamId,
        cardId: event.container.data[event.currentIndex]['_id'],
        columnId: colId,
        prevColId: this.overContainers[0].colId,
        oldIndex: event.previousIndex,
        newIndex: event.currentIndex,
        githubColumn: githubColumnId,
        git: this.board.githubId ? true : false,
        githubId: event.container.data[event.currentIndex]['githubId'],
        position: position,
        userId: this.userId,
      });
      this.overContainers = [];
      //   console.group('Change container event');
      //   console.log('Previous container data:', event.previousContainer.data);
      //   console.log('Container data:', event.container.data);
      //   console.log('Previous index:', event.previousIndex);
      //   console.log('Current index:', event.currentIndex);
      //   console.groupEnd();
      //   console.log(this.board);
    }
  }

  toggleChat() {
    this.chatActive = !this.chatActive;
  }

  exit(event: CdkDragExit<string[]>, colId, githubColumnId) {
    this.overContainers.push({ colId, githubColumnId });
    // event.container.exited.subscribe((e) => console.log(e));
    // this._webSocket.emit('removeCardFromColumn', {
    //   room: this.teamId,
    //   cardId: event.container.data[event.currentIndex]['_id'],
    //   columnId: colId,
    //   oldIndex: event.previousIndex,
    //   newIndex: event.currentIndex,
    // });
  }
}
