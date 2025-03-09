import React, { useState } from 'react';
import axios from 'axios';

function calculateBMI(weight, height) {
  const bmi = weight / Math.pow(height / 100, 2);
  return bmi.toFixed(2);
}

function calculateCaffeine(age) {
  return age > 18 ? age * 6 : age * 3;
}

function getBMIMessage(bmi) {
  let message = '';
  let className = '';

  if (bmi < 18.5) {
    message = "شما کمبود وزن دارید";
    className = 'text-red-500';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    message = "وزن شما ایده آل است";
    className = 'text-[#F57C00]';
  } else if (bmi >= 25 && bmi <= 30) {
    message = "شما اضافه وزن دارید";
    className = 'text-red-500';
  } else if (bmi >= 30 && bmi <= 35) {
    message = "شما چاقی نوع 1 دارید";
    className = 'text-red-500';
  } else if (bmi >= 35 && bmi <= 40) {
    message = "شما چاقی نوع 2 دارید";
    className = 'text-red-500';
  } else if (bmi >= 40 && bmi <= 100) {
    message = "شما چاقی نوع سه دارید (بیمارگونه)";
    className = 'text-red-500';
  }

  return { message, className };
}

function getAgeMessage(age, gender) {
  if (gender === 'male') {
    if (age >= 18 && age <= 24) {
      return "در صورتی که وزن شما ایده آل باشد قهوه برای شما مفید است .طبق بررسی محققین و دانشمندان; بهترین سن برای برای شروع قهوه نوشیدن 18 سال به بعد می باشد.البته می بایست به مقدار متعادل متناسب با شرایط فردی خود توجه داشته باشید. در این سن بدن معمولا بهتر می تواند کافئین را متابولیزه کند. کافئین موجود در قهوه می تواند به بهبود تمرکز حافظه و عملکرد شناختی کمک کند. ضمن اینکه قهوه حاوی ترکیبات آنتی اکسیدان است که میتواند به کاهش التهاب و محافظت از سلول کمک کند و اگر ورزش می کنید می تواند استقامت و عملکرد ورزشی را افزایش دهد. سازمان ایمنی غذای اروپا و سازمان غذا و دارویی آمریکا توصیه میکند که مصرف روزانه کافئین در این سن نباید از 400 میلی گرم تجاوز کند";
    } else if (age >= 12 && age <= 17) {
      return "در صورتی که وزن شما ایده آل باشد قهوه برای شما به صورت محدود توصیه میشود; مصرف قهوه برای شما به مقدار بسیار کم وتحت نظارت والدین توصیه میشود چرا که قهوه یک محرک قوی است و می تواند بر سیستم عصبی مرکزی تاثیر بگذارد. حساسیت به کافئین در این سنین شایع تر است و می تواند عوارضی مانند بی خوابی،اضطراب، افزایش ضربان قلب و مشکلات گوارشی ایجاد کند. سازمان آکادمی اطفال آمریکا توصیه میکند که نوجوان زیر 18 سال نباید بیش از 100 میلی گرم کافئین در روز مصرف کنند. یک فنجان قهوه ضعیف یا یک قوطی نوشابه به عنوان مثال بک فنجان قهوه به همراه یک تکه شکلات بچه ها را در معرض مقداری بیشتری از میزان کافئین مجاز قرار می دهد.بر اساس تحقیقات به عمل آماده،اطمینان داشته باشید که یک فنجان قهوه روزانه به بچه های بالای 12 سال آسیب نمی رساند البته تا زمانی که از سایر منابع کافئین دوری کنند";
    } else if (age >= 1 && age <= 6) {
      return "به دلیل اینکه مغز کودک در 5 سال اول زندگی بیشترین رشد را دارد مصرف کافئین می تواند باعث پیش فعالی و بی قراری در کودک گردد. همچنین کافئین ممکن است در جذب برخی مواد مغزی مانند کلسیم اختلال ایجاد کند، که برای رشد استخوان ها و دندان های کودکان ضروری است.";
    } else if (age >= 24 && age <= 44) {
      return "  در صورتی که وزن شما ایده آل باشد مصرف قهوه به صورت کنترل شده توصیه می شود . قهوه در این سن میتواند برای شما بخشی از یک سبک زندگی سالم باشد،البته به مقدار متعادل و باتوجه به شرایط فردی. قهوه در این سن برای شما منبعی از آنتی اکسیدان هاست که به کاهش التهاب و محافظت از سلول ها کمک میکند،همچنین تمرکز حافظه و هوشیاری  را افزایش داده و به کاهش خطر بیماری های مانند دیابت نوع2 بیماری های کبدی و برخی سرطان ها و آلزایمر کمک کند";
    } else if (age >= 7 && age <= 12) {
      return " حتی در صورتی که وزن شما ایده ال باشد مصرف قهوه برای شما توصیه نمی شود. مصرف قهوه در محدوده سنی شما توصیه نمی شود چرا که مقدار مفیدی از کافئین توسط نوشابه های کولا، چای، شکلات و انرژی زا به بدن می رسد و نیازی به مصرف قهوه نیست. طبق توصیه سازمان های بهداشتی مقدار مجاز کافئین برای شما نباید بیش از 45 میلی گرم کافئین در روز مصرف کنید";
    } else if (age >= 44 && age <= 150) {
      return " مصرف قهوه با مشورت پزشک توصیه می شود ; مقدار مجاز کافئین در این سن طبق توصیه سازمان های بهداشتی 400 میلی گرم است که بسته به طیف وسیعی از عوامل مانند سلامت کلی بدن،ژنتیک و استفاده از داروهای مختلف تاثیر متفاوتی بر افراد دارد. بدن انسان دارای آنزیمی به نام سیتو کروم می باشد که به پاکسازی بدن از کافئین می پردازد و قدرت بدن هر فرد در تولید این آنزیم با افراد دیگر متفاوت است. به این ترتیب بسته به سلامت کبد و حساسیت افراد به کافئین، میزان مناسب می تواند متغیر باشد. با توجه به اینکه با افزایش سن سرعت متابولیسم کافئین کاهش می یابد.اگر در این سن به بیماری خاصی مبتلا هستید و یا از دارو استفاده می کنید،بهتر است با پزشک خود مشورت کنید تا از تداخلات دارویی احتمالی و تاثیرات آن در بدن خود آگاه شوید";
    }
  }
}

function getPregnancyBreastfeedingMessage(gender, pregnant, breastfeeding) {
  if (gender === 'female') {
    if (pregnant === 'yes') return "قهوه برای شما مناسب نیست";
    if (breastfeeding === 'yes') return "مصرف قهوه با احتیاط توصیه می‌شود";
  }
  return '';
}

function BMICalculator() {
  const [formData, setFormData] = useState({
    firstName: '',
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    pregnant: 'no',
    breastfeeding: 'no',
  });
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, weight, height, age, gender, pregnant, breastfeeding } = formData;

    if (!firstName.trim()) {
      alert('لطفا نام خود را وارد کنید.');
      return;
    }
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);
    if (
      isNaN(weightNum) ||
      weightNum <= 0 ||
      weightNum > 250 ||
      isNaN(heightNum) ||
      heightNum <= 0 ||
      isNaN(ageNum) ||
      ageNum <= 0 ||
      ageNum > 150
    ) {
      alert('لطفاً وزن، قد و سن را به صورت اعداد معتبر وارد کنید. وزن باید بین 0 تا 250 و سن بین 0 تا 150 باشد.');
      return;
    }

    const bmi = calculateBMI(weightNum, heightNum);
    const caffeine = calculateCaffeine(ageNum);
    const { message: bmiMessage, className } = getBMIMessage(bmi);
    const ageMessage = getAgeMessage(ageNum, gender);
    const pregnancyBreastfeedingMessage = getPregnancyBreastfeedingMessage(gender, pregnant, breastfeeding);

    let pregnancyMessage = '';
    if (gender === 'female') {
      if (pregnant === 'yes') {
        pregnancyMessage = "طبق تحقیقات به عمل آمده تا قبل از شش ماهگی فرایند جذب و دفع کافئین هنگام نوشیدن قهوه ی مادر ممکن است صد و شصت ساعت(بیش از شش روز) به طول انجامد. اما سازمان های بهداشتی مانند آکادمی اطفال آمریکا و سازمان جهانی بهداشت مصرف 200 میلی گرم کافئین در روز برای زنان شیرده توصیه می کند(معادل یک لیوان 240 میلی لیتر قهوه فرانسه یا دمی) توجه داشته باشید که مصرف زیاد قهوه در دوران شیردهی باعث کاهش آهن در شیر مادر شده ممکن است باعث بی قراری یا اختلالات خواب در نوزاد شود. اگر نگران تاثیر کافئین بر نوزاد هستید می توانید از قهوه ی بدون کافئین (با مشورت پزشک) استفاده کنید. زمان مصرف: بهتر است قهوه بلافاصله پس از شیردهی مصرف شود تا زمان کافی برای کاهش کافئین در شیر مادر قبل از شیردهی بعدی وجود داشته باشد. معمولا سطح کافئین در شیر مادر حدود یک تا دو ساعت پس از مصرف به اوج خود می رسد";
      } else if (pregnant === 'no' && breastfeeding === 'no') {
        pregnancyMessage = "بر اساس تحقیقات و توصیه های پزشکی مصرف محدود کافئین در دوران بارداری معمولا بی خطر است اما مصرف زیاد آن خطراتی به همراه دارد. سازمان جهانی بهداشت و کالج آمریکایی متخصصین زنان و زایمان مصرف کافئین را به حداکثر 200 میلی گرم در روز محدود می کنند. خطرات: 1.مصرف زیاد کافئین ممکن است خطر سقط جنین را افزایش دهد. 2. کافئین می تواند از جفت عبور کند و به جنین برسد. متابولیسم کافئین در جنین کند تر است و ممکن است بر رشد او تاثیر بگذارد. 3. قهوه می تواند جذب آهن را کاهش دهد و برای شما که در دوران بارداری به سر می برید مهم است.(کم خونی فقر آهن در بارداری شایع است). 4. کاهش وزن نوزاد، نقص هنگام تولد و زایمان زودرس نیز عوارضی هستند که با مصرف زیاد قهوه با آن رو به رو خواهید بود. توصیه: شما میتوانید مصرف قهوه را محدود کنید و اگر به قهوه عادت دارید ار قهوه های بدون کافئین یا قهوه های رقیق(فرانسه)استفاده کنید";
      } else if (breastfeeding === 'yes') {
        if (age >= 18 && age <= 24) {
          pregnancyMessage = "در صورتی که وزن شما ایده آل باشد قهوه برای شما مفید است .طبق بررسی محققین و دانشمندان; بهترین سن برای برای شروع قهوه نوشیدن 18 سال به بعد می باشد.البته می بایست به مقدار متعادل متناسب با شرایط فردی خود توجه داشته باشید. در این سن بدن معمولا بهتر می تواند کافئین را متابولیزه کند. کافئین موجود در قهوه می تواند به بهبود تمرکز حافظه و عملکرد شناختی کمک کند. ضمن اینکه قهوه حاوی ترکیبات آنتی اکسیدان است که میتواند به کاهش التهاب و محافظت از سلول کمک کند و اگر ورزش می کنید می تواند استقامت و عملکرد ورزشی را افزایش دهد. سازمان ایمنی غذای اروپا و سازمان غذا و دارویی آمریکا توصیه میکند که مصرف روزانه کافئین در این سن نباید از 400 میلی گرم تجاوز کند";
        } else if (age >= 12 && age <= 17) {
          pregnancyMessage = "در صورتی که وزن شما ایده آل باشد قهوه برای شما به صورت محدود توصیه میشود; مصرف قهوه برای شما به مقدار بسیار کم وتحت نظارت والدین توصیه میشود چرا که قهوه یک محرک قوی است و می تواند بر سیستم عصبی مرکزی تاثیر بگذارد. حساسیت به کافئین در این سنین شایع تر است و می تواند عوارضی مانند بی خوابی،اضطراب، افزایش ضربان قلب و مشکلات گوارشی ایجاد کند. سازمان آکادمی اطفال آمریکا توصیه میکند که نوجوان زیر 18 سال نباید بیش از 100 میلی گرم کافئین در روز مصرف کنند. یک فنجان قهوه ضعیف یا یک قوطی نوشابه به عنوان مثال بک فنجان قهوه به همراه یک تکه شکلات بچه ها را در معرض مقداری بیشتری از میزان کافئین مجاز قرار می دهد.بر اساس تحقیقات به عمل آماده،اطمینان داشته باشید که یک فنجان قهوه روزانه به بچه های بالای 12 سال آسیب نمی رساند البته تا زمانی که از سایر منابع کافئین دوری کنند";
        } else if (age >= 1 && age <= 6) {
          pregnancyMessage = "به دلیل اینکه مغز کودک در 5 سال اول زندگی بیشترین رشد را دارد مصرف کافئین می تواند باعث پیش فعالی و بی قراری در کودک گردد. همچنین کافئین ممکن است در جذب برخی مواد مغزی مانند کلسیم اختلال ایجاد کند، که برای رشد استخوان ها و دندان های کودکان ضروری است.";
        } else if (age >= 24 && age <= 44) {
          pregnancyMessage = "  در صورتی که وزن شما ایده آل باشد مصرف قهوه به صورت کنترل شده توصیه می شود . قهوه در این سن میتواند برای شما بخشی از یک سبک زندگی سالم باشد،البته به مقدار متعادل و باتوجه به شرایط فردی. قهوه در این سن برای شما منبعی از آنتی اکسیدان هاست که به کاهش التهاب و محافظت از سلول ها کمک میکند،همچنین تمرکز حافظه و هوشیاری  را افزایش داده و به کاهش خطر بیماری های مانند دیابت نوع2 بیماری های کبدی و برخی سرطان ها و آلزایمر کمک کند";
        } else if (age >= 7 && age <= 12) {
          pregnancyMessage = " حتی در صورتی که وزن شما ایده ال باشد مصرف قهوه برای شما توصیه نمی شود. مصرف قهوه در محدوده سنی شما توصیه نمی شود چرا که مقدار مفیدی از کافئین توسط نوشابه های کولا، چای، شکلات و انرژی زا به بدن می رسد و نیازی به مصرف قهوه نیست. طبق توصیه سازمان های بهداشتی مقدار مجاز کافئین برای شما نباید بیش از 45 میلی گرم کافئین در روز مصرف کنید";
        } else if (age >= 44 && age <= 150) {
          pregnancyMessage = " مصرف قهوه با مشورت پزشک توصیه می شود ; مقدار مجاز کافئین در این سن طبق توصیه سازمان های بهداشتی 400 میلی گرم است که بسته به طیف وسیعی از عوامل مانند سلامت کلی بدن،ژنتیک و استفاده از داروهای مختلف تاثیر متفاوتی بر افراد دارد. بدن انسان دارای آنزیمی به نام سیتو کروم می باشد که به پاکسازی بدن از کافئین می پردازد و قدرت بدن هر فرد در تولید این آنزیم با افراد دیگر متفاوت است. به این ترتیب بسته به سلامت کبد و حساسیت افراد به کافئین، میزان مناسب می تواند متغیر باشد. با توجه به اینکه با افزایش سن سرعت متابولیسم کافئین کاهش می یابد.اگر در این سن به بیماری خاصی مبتلا هستید و یا از دارو استفاده می کنید،بهتر است با پزشک خود مشورت کنید تا از تداخلات دارویی احتمالی و تاثیرات آن در بدن خود آگاه شوید";
        }
      }
    }

    const userData = {
      firstName,
      weight: weightNum,
      height: heightNum,
      age: ageNum,
      gender,
      pregnant,
      breastfeeding,
      bmi,
      caffeine,
    };

    try {
      const response = await axios.post('https://enough-coffee.liara.run/api/bmi/users', userData);
      console.log('User saved:', response.data);
    } catch (error) {
      console.error('Error saving user:', error);
    }

    setResults({
      bmi,
      caffeine,
      bmiMessage,
      className,
      ageMessage,
      pregnancyBreastfeedingMessage,
      pregnancyMessage,
    });
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      weight: '',
      height: '',
      age: '',
      gender: 'male',
      pregnant: 'no',
      breastfeeding: 'no',
    });
    setResults(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-[#FFF5E1] rounded-xl shadow-2xl">
      <h1 className="text-2xl font-bold text-[#3E2723] mb-6 text-center">Enough Coffee</h1>
      {!results ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="نام"
            className="border border-[#8D5524] p-3 w-full rounded-lg text-[#3E2723] placeholder-[#8D5524] focus:outline-none focus:ring-2 focus:ring-[#F57C00]"
          />
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="وزن (کیلوگرم)"
            className="border border-[#8D5524] p-3 w-full rounded-lg text-[#3E2723] placeholder-[#8D5524] focus:outline-none focus:ring-2 focus:ring-[#F57C00]"
            min="0"
            max="250"
          />
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="قد (سانتی‌متر)"
            className="border border-[#8D5524] p-3 w-full rounded-lg text-[#3E2723] placeholder-[#8D5524] focus:outline-none focus:ring-2 focus:ring-[#F57C00]"
            min="0"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="سن"
            className="border border-[#8D5524] p-3 w-full rounded-lg text-[#3E2723] placeholder-[#8D5524] focus:outline-none focus:ring-2 focus:ring-[#F57C00]"
            min="0"
            max="150"
          />
          <div className="flex space-x-6 justify-center">
            <label className="inline-flex items-center text-[#3E2723] gap-x-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={() => handleRadioChange('gender', 'male')}
                className="form-radio text-[#F57C00] focus:ring-[#F57C00]"
              />
              <span className="ml-2">مرد</span>
            </label>
            <label className="inline-flex items-center text-[#3E2723] gap-x-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={() => handleRadioChange('gender', 'female')}
                className="form-radio text-[#F57C00] focus:ring-[#F57C00]"
              />
              <span className="ml-2">زن</span>
            </label>
          </div>
          {formData.gender === 'female' && (
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-[#3E2723] mb-1">آیا باردار هستید؟</label>
                <select
                  name="pregnant"
                  value={formData.pregnant}
                  onChange={handleChange}
                  className="border border-[#8D5524] p-3 w-full rounded-lg text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#F57C00]"
                >
                  <option value="no">خیر</option>
                  <option value="yes">بله</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-[#3E2723] mb-1">آیا در دوران شیردهی هستید؟</label>
                <select
                  name="breastfeeding"
                  value={formData.breastfeeding}
                  onChange={handleChange}
                  className="border border-[#8D5524] p-3 w-full rounded-lg text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#F57C00]"
                >
                  <option value="no">خیر</option>
                  <option value="yes">بله</option>
                </select>
              </div>
            </div>
          )}
          <div className="flex space-x-4 justify-center">
            <button
              type="submit"
              className="bg-[#F57C00] text-white py-2 px-6 rounded-lg hover:bg-[#d96b00] transition duration-300"
            >
              محاسبه
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-[#8D5524] text-white py-2 px-6 rounded-lg hover:bg-[#7a4a20] transition duration-300"
            >
              ریست
            </button>
          </div>
          <span className='w-full flex justify-center gap-x-1'>نوشته شده توسط <a href="https://khomarian.ir" target='_blank' className='text-coffee font-bold'>فروشگاه خماریان</a></span>
        </form>
      ) : (
        <div className="mt-6 p-6 border border-[#8D5524] rounded-lg bg-[#8D5524]/10 space-y-4">
          <p className="text-lg text-[#3E2723]">
            {formData.firstName} عزیز، شاخص توده بدنی شما{' '}
            <span className="font-bold text-[#F57C00]">{results.bmi}</span> است
          </p>
          <p className="text-[#3E2723]">
            میزان کافئین توصیه شده برای شما{' '}
            <span className="font-bold text-[#F57C00]">{results.caffeine}</span> میلی‌گرم در روز است
          </p>
          <p className={`${results.className} font-semibold`}>{results.bmiMessage}</p>
          {results.ageMessage && <p className="text-[#3E2723]">{results.ageMessage}</p>}
          {results.pregnancyBreastfeedingMessage && (
            <p className="text-[#3E2723]">{results.pregnancyBreastfeedingMessage}</p>
          )}
          {results.pregnancyMessage && (
            <p className="text-[#3E2723]">{results.pregnancyMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BMICalculator;