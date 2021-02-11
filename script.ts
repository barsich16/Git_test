
console.log("Всё работает хорошо!");

//Базовый класс
class Product {
   constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number) {

   }

   //Инициализация карточки
   Init(): any {
      let h5 = document.createElement("h5");
      h5.setAttribute("class", "card-title");
      h5.innerHTML = this.name;

      let divprice = document.createElement("div");
      divprice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
      divprice.innerHTML = this.price + " грн.";

      let divavail = document.createElement("div");
      if (this.IsAvailable()) {
         divavail.setAttribute("class", "col-6 p-0 text-right text-success");
         divavail.innerHTML = "Есть в наличии";
      }
      else {
         divavail.setAttribute("class", "col-6 p-0 text-right text-danger");
         divavail.innerHTML = "Нет в наличии";
      }

      let divrow = document.createElement("div");
      divrow.setAttribute("class", "row");
      divrow.appendChild(divprice);
      divrow.appendChild(divavail);

      let divcon = document.createElement("div");
      divcon.setAttribute("class", "container");
      divcon.appendChild(divrow);

      let p = document.createElement("p");
      p.setAttribute("class", "card-text");
      p.innerHTML = this.description;

      let a = document.createElement("a");
      let i = this.id;
      let b = this.inStock;
      a.setAttribute("id", this.id.toString());
      a.setAttribute("inStock", this.inStock.toString());
      // console.log(String(this.inStock));
      a.setAttribute("href", "#buyModal");
      a.setAttribute("class", "btn btn-primary");
      a.setAttribute("data-toggle", "modal");
      a.onclick = function () { WantBuy(i, b) };
      a.innerHTML = "Купить";

      let divfu = document.createElement("div");
      divfu.setAttribute("class", "card-footer");
      divfu.appendChild(a);

      let divcardb = document.createElement("div");
      divcardb.setAttribute("class", "card-body mh-100");
      divcardb.setAttribute("style", "height: 200px");
      divcardb.appendChild(h5);
      divcardb.appendChild(divcon);
      divcardb.appendChild(p);

      let divcard = document.createElement("div");
      divcard.setAttribute("class", "card");
      divcard.appendChild(divcardb);
      divcard.appendChild(divfu);

      let divcol = document.createElement("div");
      divcol.setAttribute("class", "col-md-6 col-xl-4 p-1");
      divcol.appendChild(divcard);

      return divcol;
   }

   //Добавление карточки в строку
   protected Embed(obj: any) {
      let prods = document.getElementById('rowts');
      prods.appendChild(obj);
   }

   //Определение есть ли товар в наличии
   IsAvailable(): boolean {
      return (this.inStock > 0) ? true : false;
   }
}
//Перечисление доступных цветов
enum Color{ Black = "Чёрный", Gray = "Серый", Pink = "Розовый" };

interface Shoes {
   dimension: number; //размер
   color: Color; //цвет
   quantity: number; //количество
}

//Класс со сложными особенностями
class FeltBoots extends Product {
   isBigSizes: boolean; //Есть большие размеры
   haveColors: string[]; //Цвета которые есть
   constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public list?: Shoes[]) {
      super(id, name, price, description, inStock);
      this.CalculateFlags();
      this.Init();
   }

   Init() {
      let obj = super.Init();

      //Если есть большие размеры, то добавляем информацию об этом в карточку
      if (this.isBigSizes) {
         let p = document.createElement("p");
         p.setAttribute("class", "card-text text-info m-0");
         p.innerHTML = "Есть большие размеры";
         obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
      }

      //Если есть информация о цвете, то добавляем её в карточку
      if (this.haveColors.length > 0) {
         let p = document.createElement("p");
         p.setAttribute("class", "card-text text-info m-0");
         let str = this.haveColors[0];
         for (let i = 1; i < this.haveColors.length; i++) {
            str += ", " + this.haveColors[i];
         }
         p.innerHTML = "Есть цвета: " + str;
         obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
      }

      this.Embed(obj);
   }

   //Вычисление сложных особенностей
   CalculateFlags() {
      //Поиск больших размеров
      this.isBigSizes = false;
      if (this.list != null)
         for (let i = 0; i < this.list.length; i++)
            if (this.list[i].dimension > 43 && this.list[i].quantity > 0) {
               this.isBigSizes = true;
               break;
            }
      //Поиск доступных цветов
      let k = 0;
      this.haveColors = [];
      if (this.list != null)
         for (let i = 0; i < this.list.length; i++)
            if (this.haveColors.indexOf(this.list[i].color) == -1)
               this.haveColors[k++] = this.list[i].color;
   }
}

//Класс с группировкой
class Headphones extends Product {
   constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public isWireless?: boolean) {
      super(id, name, price, description, inStock);
      this.Init();
   }

   public Init() {
      let obj = super.Init();

      //Если наушники беспроводные, то добавляем информацию об этом в карточку
      if (this.isWireless) {
         let p = document.createElement("p");
         p.setAttribute("class", "card-text text-info m-0");
         p.innerHTML = "Беспроводные";
         obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
      }

      //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
      if (document.getElementById('isWireless') == null && this.isWireless != null && this.isWireless) {
         let inp = document.createElement("input");
         inp.setAttribute("type", "checkbox");
         inp.setAttribute("id", "isWireless");
         inp.setAttribute("onclick", "CheckWireless(this.checked)");

         let lab = document.createElement("p");
         lab.appendChild(inp);
         lab.innerHTML += "Только беспроводные<br>";

         let div = document.getElementById('myTools');
         div.appendChild(lab);
      }

      this.Embed(obj);
   }
}

//Группировка по беспроводным наушникам
function CheckWireless(flag: boolean) {
   document.getElementById('rowts').innerHTML = "";
   if (flag) {
      for (let i = 0; i < this.productList.length; i++)
         if (productList[i] instanceof Headphones && (<Headphones>productList[i]).isWireless) (<Headphones>productList[i]).Init();
   }
   else {
      for (let i = 0; i < this.productList.length; i++)
         productList[i].Init();
   }
}
//Класс с группировкой
class Computers extends Product {
   constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public hardDisk: string, public isGamers?: boolean) {
      super(id, name, price, description, inStock);
      this.Init();
   }

   public Init() {
      let obj = super.Init();

      //Если наушники беспроводные, то добавляем информацию об этом в карточку
      if (this.isGamers) {
         let p = document.createElement("p");
         p.setAttribute("class", "card-text text-info m-0");
         p.innerHTML = "Для игр";
         obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
      }
      if (this.hardDisk == "HDD") {
         let p = document.createElement("p");
         p.setAttribute("class", "card-text text-info m-0");
         p.innerHTML = "HDD";
         obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
      } else if (this.hardDisk == "SSD") {    
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "SSD";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
      }


      //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
      if (document.getElementById('isGamers') == null && this.isGamers != null && this.isGamers) {
         let inp = document.createElement("input");
         inp.setAttribute("type", "checkbox");
         inp.setAttribute("id", "isGamers");
         inp.setAttribute("onclick", "CheckGamers(this.checked)");

         let lab = document.createElement("p");
         lab.appendChild(inp);
         lab.innerHTML += "Только для игр<br>";

         let div = document.getElementById('myTools');
         div.appendChild(lab);
      }
      if (document.getElementById('hardDiskHDD') == null && this.hardDisk != null && this.hardDisk == "HDD") {
         let inp = document.createElement("input");
         inp.setAttribute("type", "checkbox");
         inp.setAttribute("id", "hardDiskHDD");
         inp.setAttribute("onclick", "CheckHardDiskHDD(this.checked)");

         let lab = document.createElement("p");
         lab.appendChild(inp);
         lab.innerHTML += "HDD<br>";

         let div = document.getElementById('myTools');
         div.appendChild(lab);
      } else if (document.getElementById('hardDiskSSD') == null && this.hardDisk != null && this.hardDisk == "SSD") {
         let inp = document.createElement("input");
         inp.setAttribute("type", "checkbox");
         inp.setAttribute("id", "hardDiskSSD");
         inp.setAttribute("onclick", "CheckHardDiskSSD(this.checked)");

         let lab = document.createElement("p");
         lab.appendChild(inp);
         lab.innerHTML += "SSD<br>";

         let div = document.getElementById('myTools');
         div.appendChild(lab);
      }

      this.Embed(obj);
   }
}
//Группировка по компам для игр
function CheckHardDiskHDD(flag: boolean) {
   document.getElementById('rowts').innerHTML = "";
   if (flag) {
      for (let i = 0; i < this.productList.length; i++)
         if (productList[i] instanceof Computers && (<Computers>productList[i]).hardDisk == "HDD") (<Computers>productList[i]).Init();
   }
   else {
      for (let i = 0; i < this.productList.length; i++)
         productList[i].Init();
   }
}
function CheckHardDiskSSD(flag: boolean) {
   document.getElementById('rowts').innerHTML = "";
   if (flag) {
      for (let i = 0; i < this.productList.length; i++)
         if (productList[i] instanceof Computers && (<Computers>productList[i]).hardDisk == "SSD") (<Computers>productList[i]).Init();
   }
   else {
      for (let i = 0; i < this.productList.length; i++)
         productList[i].Init();
   }
}
function CheckGamers(flag: boolean) {
   document.getElementById('rowts').innerHTML = "";
   if (flag) {
      for (let i = 0; i < this.productList.length; i++)
         if (productList[i] instanceof Computers && (<Computers>productList[i]).isGamers) (<Computers>productList[i]).Init();
   }
   else {
      for (let i = 0; i < this.productList.length; i++)
         productList[i].Init();
   }
}

class Clothes extends Product {
   constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public isMale?: boolean, public isFemale?: boolean) {
      super(id, name, price, description, inStock);
      this.Init();
   }

   public Init() {
      let obj = super.Init();

      //Если наушники беспроводные, то добавляем информацию об этом в карточку
      if (this.isMale) {
         let p = document.createElement("p");
         p.setAttribute("class", "card-text text-info m-0");
         p.innerHTML = "Мужская одежда";
         obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
      } else if (this.isFemale) {
         let p = document.createElement("p");
         p.setAttribute("class", "card-text text-info m-0");
         p.innerHTML = "Женская одежда";
         obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
      }

      //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
      if (document.getElementById('isMale') == null && this.isMale != null && this.isMale) {
         let inp = document.createElement("input");
         inp.setAttribute("type", "checkbox");
         inp.setAttribute("id", "isMale");
         inp.setAttribute("onclick", "CheckMale(this.checked)");

         let lab = document.createElement("p");
         lab.appendChild(inp);
         lab.innerHTML += "Мужская одежда<br>";

         let div = document.getElementById('myTools');
         div.appendChild(lab);
      } else if (document.getElementById('isFemale') == null && this.isFemale != null && this.isFemale) {
         let inp = document.createElement("input");
         inp.setAttribute("type", "checkbox");
         inp.setAttribute("id", "isFemale");
         inp.setAttribute("onclick", "CheckFemale(this.checked)");

         let lab = document.createElement("p");
         lab.appendChild(inp);
         lab.innerHTML += "Женская одежда<br>";

         let div = document.getElementById('myTools');
         div.appendChild(lab);
      }

      this.Embed(obj);
   }
}
//Группировка по компам для игр
function CheckMale(flag: boolean) {
   document.getElementById('rowts').innerHTML = "";
   if (flag) {
      for (let i = 0; i < this.productList.length; i++)
         if (productList[i] instanceof Clothes && (<Clothes>productList[i]).isMale) (<Clothes>productList[i]).Init();
   }
   else {
      for (let i = 0; i < this.productList.length; i++)
         productList[i].Init();
   }
}

function CheckFemale(flag: boolean) {
   document.getElementById('rowts').innerHTML = "";
   if (flag) {
      for (let i = 0; i < this.productList.length; i++)
         if (productList[i] instanceof Clothes && (<Clothes>productList[i]).isFemale) (<Clothes>productList[i]).Init();
   }
   else {
      for (let i = 0; i < this.productList.length; i++)
         productList[i].Init();
   }
}

//Класс пока не имеющий отличий от базового
class Balalaika extends Product {
   constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number) {
      super(id, name, price, description, inStock);
      this.Init();
   }

   Init() {
      this.Embed(super.Init());
   }
}

interface BasketRecord {
   id: number; //id товара
   quantity: number; //Его количество
}

class Basket {
   private list: BasketRecord[] = []; //Список товаров в корзине

   constructor() {

   }

   //Добавить товар в корзину. Возвращает результат операции
   Add(val: number): boolean {
      let num = +(<HTMLInputElement>document.getElementById('inputquantity')).value;

      //Проверка введенного количества товара. Если ввели ерунду, то выводится сообщение об ошибке. Иначе товар добавляется в корзину
      if (isNaN(num) || !((num ^ 0) === num) || num == 0 || productList[val].inStock < num) {
         if (productList[val].inStock < num) document.getElementById('modlalMessag').innerHTML = "Столько на складе нет";
         else document.getElementById('modlalMessag').innerHTML = "Введите целое число";
         return false;
      }
      else {
         document.getElementById('modlalMessag').innerHTML = "";
         productList[val].inStock -= num;
         let exit: boolean = false;
         if (this.list.length == 0) {
            this.list[this.list.length] = { id: val, quantity: num };
         } else {
            for (let index = 0; index < this.list.length; index++) {
               if ((this.list[index].id == val) && (exit == false)) {
                  console.log("added1");
                  this.list[index].quantity += num;
                  exit = true;
                  break;
               }
               else if ((index == this.list.length - 1) && (exit == false)) {
                  this.list[this.list.length] = { id: val, quantity: num };
                  exit = true;
                  console.log("added");
               }
            } 
         }
         this.CalculateBasket();
         return true;
      }
   }

   //Пересчитать товары в корзине
   CalculateBasket() {
      if (this.list.length > 0) {
         let id;
         let total: number = 0;
         let message: string = "В данний момент в корзине:<br>";
         for (let i = 0; i < this.list.length; i++) {
            message += productList[this.list[i].id].name + " - " + this.list[i].quantity + "<br>";
            total += productList[this.list[i].id].price * this.list[i].quantity;
         }
         message += "<br><br>На общую сумму " + total + " грн.";

         document.getElementById('myBasket').innerHTML = message;
      }
      else document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
   }
}

//Действие на кнопке "добавить в корзину"
function myByBtn(val: any) {
   if (basket.Add(val)) $('#buyModal').hide;
}

//Действие на кнопке "купить"
function WantBuy(val: any, numStock: number) {
   console.log(numStock);
   document.getElementById('modlalBtn').setAttribute("value", val);
   document.getElementById('number__tovar').innerHTML = numStock.toString();   
}

//Инициализация корзины
let basket: Basket = new Basket();
//Список продуктов
let productList: Product[] = [
   new Headphones(0, "Наушники фирмы1", 816, "Прекрасные наушники! Сама английская королева слушает жесткий металл через такие же!", 4, true),
   new FeltBoots(1, "Валенки2", 91.2, "Хороший выбор! В них тепло, хорошо. Обувь многосезонная - лето, осень, зима, весна.", 6,
      [{ dimension: 44, color: Color.Black, quantity: 2 },
      { dimension: 43, color: Color.Black, quantity: 3 },
      { dimension: 42, color: Color.Black, quantity: 1 },
      { dimension: 41, color: Color.Black, quantity: 2 },
      { dimension: 44, color: Color.Gray, quantity: 2 },
      { dimension: 39, color: Color.Gray, quantity: 1 },
      { dimension: 45, color: Color.Gray, quantity: 1 },
      { dimension: 42, color: Color.Gray, quantity: 1 },
      ]),
   new Headphones(2, "Наушники фирмы4", 119.50, "Дёшево не значит плохо! Эти наушники стоят своих денег!", 30, false),
   new Headphones(3, "Наушники фирмы2", 144, "Это оптимальный выбор! Налетай торопись!", 15, true),
   new Balalaika(4, "Балалайка1", 915, "Сам страдивари её выстругал! Мастер Страдивари Аарон Моисеевич ©. В комплекте к балалайке должен идти медведь.", 1),
   new FeltBoots(5, "Валенки3", 65, "Валенки знаменитой российской фабрики Красный ЦинБаоЧен. Оригинальный продукт сделаный по технологиям прошлого.", 1),
   new Headphones(6, "Наушники фирмы3", 265, "Тру поклонники музыки обязательно такие имеют! А ты что? Ты не тру?!", 0),
   new FeltBoots(7, "Валенки1", 666.66, "Валенки великолепной работы слепого мастера Игната! В комплекте к валенкам идёт кокошник.", 2,
      [{ dimension: 45, color: Color.Pink, quantity: 1 },
      { dimension: 43, color: Color.Pink, quantity: 1 }
      ]),
   new Balalaika(8, "Балалайка2", 217, "Обычная балалайка белорусской фирмы Змрочныя мелодыі.", 1),
   new Computers(9, "Ноутбук Lenovo", 25000, "Прекрасный ноутбук для игр!", 10, "SSD", true),
   new Computers(10, "Ноутбук Asus", 10000, "Прекрасный ноутбук для офиса!", 8, "HDD", false),
   new Clothes(11, "Пальто", 1500, "Теплое зимнее пальто", 5, true, false),
   new Clothes(11, "Куртка", 950, "Осенняя", 7, false, true),];


