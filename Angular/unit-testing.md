## Unit Testing

A unit test is used to test individual components of the system. That’s why unit testing is basically called isolated testing. It is the best practice of testing small isolated pieces of code.

### Benefits of unit testing

* Easily develop features without break existing functionality
* gives more confident to developers
* provides good documentation
* Reveals mistakes in design and implementation. 

### Jasmine

Jasmine is the most popular JavaScript testing framework in the Angular community.

Jasmine provides several functions to write test

some of them are,

* describe
* it
* beforeEach
* expect

### Steps

Import TestBed and async packages

Using TestBed we can configure the entire module and make it available in the
suite for unit testing

Following will unit test a Component

```ts

import { TestBed, async } from '@angular/core/testing';

import { QuoteTextComponent } from './quote-text.component';

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuoteTextComponent
      ],
    }).compileComponents();
  }));

  it(`should render @input`, async(() => {
    const fixture = TestBed.createComponent(QuoteTextComponent);
    const app = fixture.debugElement.componentInstance;
    app.text = 'test quote';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('q').innerText).toEqual('test quote');
  }));
});

```

### following will unit test a form 

```ts
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let comp: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ContactComponent);

      comp = fixture.componentInstance; // ContactComponent test instance
      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  it(`should have as text 'contact page'`, async(() => {
    expect(comp.text).toEqual('contact page');
  }));

  it(`should set submitted to true`, async(() => {
    comp.onSubmit();
    expect(comp.submitted).toBeTruthy();
  }));

  it(`should call the onSubmit method`, async(() => {
    spyOn(comp, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.onSubmit).toHaveBeenCalled();
  }));

 it(`form should be invalid`, async(() => {
    comp.contactForm.controls['email'].setValue('');
    comp.contactForm.controls['name'].setValue('');
    comp.contactForm.controls['text'].setValue('');
    expect(comp.contactForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.contactForm.controls['email'].setValue('asd@asd.com');
    comp.contactForm.controls['name'].setValue('aada');
    comp.contactForm.controls['text'].setValue('text');
    expect(comp.contactForm.valid).toBeTruthy();
  }));
});

```

Following Example Unit testing a Service

```ts

import { UserService } from './user.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserComponent } from './user.component';
import { UserServiceMock } from '../../mocks/user.service.mock';

describe('ContactComponent', () => {
    let comp: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserComponent
            ],
            providers: [
                { provide: UserService, useClass: UserServiceMock }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(UserComponent);
            comp = fixture.componentInstance; // UserComponent test instance
        });
    }));

    it(`should have one user`, async(() => {
        expect(comp.users.length).toEqual(1);
    }));

    it(`html should render one user`, async(() => {
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('p');
        expect(el.innerText).toContain('user1');
    }));
});

```