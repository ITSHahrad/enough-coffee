import React, { useState } from 'react';
import axios from 'axios';

// Utility Functions
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
    message =
      'شما کمبود وزن دارید. این وضعیت ممکن است به دلیل تغذیه ناکافی، متابولیسم بالا یا مشکلات سلامتی باشد. کمبود وزن می‌تواند خطر ضعف سیستم ایمنی، کمبود انرژی و مشکلات استخوانی را افزایش دهد. توصیه می‌شود با یک متخصص تغذیه مشورت کنید تا برنامه غذایی مناسب برای افزایش وزن سالم داشته باشید. اگر قهوه مصرف می‌کنید، بهتر است آن را با شیر یا خامه ترکیب کنید تا کالری بیشتری دریافت کنید.';
    className = 'text-red-500';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    message =
      'وزن شما ایده آل است. این محدوده نشان‌دهنده تعادل سالم بین وزن و قد شماست و معمولاً با خطر کمتر بیماری‌های مرتبط با وزن مثل دیابت و مشکلات قلبی همراه است. حفظ این وزن با رژیم غذایی متعادل و ورزش منظم توصیه می‌شود. مصرف قهوه در حد اعتدال (تا 400 میلی‌گرم کافئین در روز) می‌تواند به افزایش تمرکز و انرژی کمک کند، به شرطی که با شرایط شخصی شما سازگار باشد.';
    className = 'text-[#F57C00]'; // Orange for ideal weight
  } else if (bmi >= 25 && bmi <= 30) {
    message =
      'شما اضافه وزن دارید. این وضعیت ممکن است به دلیل مصرف کالری بیش از نیاز یا کم‌تحرکی باشد و خطر ابتلا به بیماری‌هایی مثل فشار خون بالا، دیابت نوع 2 و مشکلات مفصلی را افزایش می‌دهد. پیشنهاد می‌شود فعالیت بدنی خود را افزایش دهید و رژیم غذایی متعادل‌تری را دنبال کنید. قهوه بدون شکر می‌تواند به افزایش متابولیسم کمک کند، اما از مصرف بیش از حد کافئین (بیش از 400 میلی‌گرم در روز) پرهیز کنید تا اضطراب یا بی‌خوابی ایجاد نشود.';
    className = 'text-red-500';
  } else if (bmi >= 30 && bmi <= 35) {
    message =
      'شما چاقی نوع 1 دارید. این سطح از چاقی می‌تواند فشار بیشتری بر قلب، مفاصل و سیستم تنفسی شما وارد کند و خطر بیماری‌های مزمن را افزایش دهد. کاهش وزن تدریجی از طریق رژیم غذایی سالم و ورزش منظم بسیار مهم است. با پزشک یا متخصص تغذیه مشورت کنید. مصرف قهوه در حد متوسط (تا 300 میلی‌گرم در روز) ممکن است به افزایش انرژی برای فعالیت بدنی کمک کند، اما از افزودن شکر یا خامه زیاد خودداری کنید.';
    className = 'text-red-500';
  } else if (bmi >= 35 && bmi <= 40) {
    message =
      'شما چاقی نوع 2 دارید. این وضعیت خطر جدی برای سلامتی شما ایجاد می‌کند، از جمله بیماری‌های قلبی، دیابت و آپنه خواب. کاهش وزن تحت نظر متخصص ضروری است و ممکن است نیاز به تغییر سبک زندگی یا حتی مداخلات پزشکی داشته باشید. قهوه می‌تواند به افزایش متابولیسم کمک کند، اما مصرف آن را به 200-300 میلی‌گرم در روز محدود کنید و از تداخل با داروهای احتمالی مطمئن شوید.';
    className = 'text-red-500';
  } else if (bmi >= 40 && bmi <= 100) {
    message =
      'شما چاقی نوع سه دارید (بیمارگونه). این سطح از چاقی به طور قابل توجهی سلامت شما را تهدید می‌کند و با خطر بالای بیماری‌های قلبی، دیابت، و کاهش طول عمر همراه است. ضروری است که فوراً با پزشک متخصص مشورت کنید تا برنامه کاهش وزن ایمن و مؤثر طراحی شود. مصرف قهوه باید با احتیاط و تحت نظر پزشک باشد (معمولاً کمتر از 200 میلی‌گرم در روز)، زیرا متابولیسم کافئین ممکن است در این شرایط تغییر کند.';
    className = 'text-red-500';
  }

  return { message, className };
}

function getAgeMessage(age, gender) {
  if (gender === 'male') {
    if (age >= 18 && age <= 24) {
      return 'در صورتی که وزن شما ایده آل باشد قهوه برای شما مفید است. طبق بررسی محققین و دانشمندان، بهترین سن برای شروع قهوه نوشیدن 18 سال به بعد است. البته باید به مقدار متعادل متناسب با شرایط فردی خود توجه کنید. در این سن بدن معمولاً بهتر می‌تواند کافئین را متابولیزه کند. کافئین موجود در قهوه می‌تواند به بهبود تمرکز، حافظه و عملکرد شناختی کمک کند. ضمن اینکه قهوه حاوی ترکیبات آنتی‌اکسیدان است که می‌تواند به کاهش التهاب و محافظت از سلول‌ها کمک کند و اگر ورزش می‌کنید، می‌تواند استقامت و عملکرد ورزشی را افزایش دهد. سازمان ایمنی غذای اروپا و سازمان غذا و دارویی آمریکا توصیه می‌کند که مصرف روزانه کافئین در این سن نباید از 400 میلی‌گرم تجاوز کند.';
    } else if (age >= 12 && age <= 17) {
      return 'در صورتی که وزن شما ایده آل باشد قهوه برای شما به صورت محدود توصیه می‌شود. مصرف قهوه برای شما به مقدار بسیار کم و تحت نظارت والدین توصیه می‌شود چرا که قهوه یک محرک قوی است و می‌تواند بر سیستم عصبی مرکزی تأثیر بگذارد. حساسیت به کافئین در این سنین شایع‌تر است و می‌تواند عوارضی مانند بی‌خوابی، اضطراب، افزایش ضربان قلب و مشکلات گوارشی ایجاد کند. سازمان آکادمی اطفال آمریکا توصیه می‌کند که نوجوانان زیر 18 سال نباید بیش از 100 میلی‌گرم کافئین در روز مصرف کنند. یک فنجان قهوه ضعیف یا یک قوطی نوشابه به عنوان مثال، همراه با یک تکه شکلات، بچه‌ها را در معرض مقداری بیشتر از میزان کافئین مجاز قرار می‌دهد. بر اساس تحقیقات، اطمینان داشته باشید که یک فنجان قهوه روزانه به بچه‌های بالای 12 سال آسیب نمی‌رساند، البته تا زمانی که از سایر منابع کافئین دوری کنند.';
    } else if (age >= 1 && age <= 6) {
      return 'به دلیل اینکه مغز کودک در 5 سال اول زندگی بیشترین رشد را دارد، مصرف کافئین می‌تواند باعث پیش‌فعالی و بی‌قراری در کودک گردد. همچنین کافئین ممکن است در جذب برخی مواد مغذی مانند کلسیم اختلال ایجاد کند، که برای رشد استخوان‌ها و دندان‌های کودکان ضروری است. توصیه می‌شود کودکان در این سن به هیچ عنوان قهوه یا نوشیدنی‌های کافئین‌دار مصرف نکنند.';
    } else if (age >= 24 && age <= 44) {
      return 'در صورتی که وزن شما ایده آل باشد مصرف قهوه به صورت کنترل شده توصیه می‌شود. قهوه در این سن می‌تواند بخشی از یک سبک زندگی سالم باشد، البته به مقدار متعادل و با توجه به شرایط فردی. قهوه منبعی از آنتی‌اکسیدان‌هاست که به کاهش التهاب و محافظت از سلول‌ها کمک می‌کند، همچنین تمرکز، حافظه و هوشیاری را افزایش می‌دهد و به کاهش خطر بیماری‌هایی مانند دیابت نوع 2، بیماری‌های کبدی، برخی سرطان‌ها و آلزایمر کمک می‌کند. حداکثر مصرف روزانه 400 میلی‌گرم کافئین توصیه می‌شود.';
    } else if (age >= 7 && age <= 12) {
      return 'حتی در صورتی که وزن شما ایده‌آل باشد، مصرف قهوه برای شما توصیه نمی‌شود. در این سنین، مقدار مفیدی از کافئین از طریق نوشابه‌های کولا، چای، شکلات و نوشیدنی‌های انرژی‌زا به بدن می‌رسد و نیازی به مصرف قهوه نیست. طبق توصیه سازمان‌های بهداشتی، مقدار مجاز کافئین برای شما نباید بیش از 45 میلی‌گرم در روز باشد تا از عوارض مانند بی‌قراری یا اختلال خواب جلوگیری شود.';
    } else if (age >= 44 && age <= 150) {
      return 'مصرف قهوه با مشورت پزشک توصیه می‌شود. مقدار مجاز کافئین در این سن طبق توصیه سازمان‌های بهداشتی 400 میلی‌گرم است، اما بسته به سلامت کلی بدن، ژنتیک و استفاده از داروها، تأثیر متفاوتی بر افراد دارد. بدن انسان دارای آنزیمی به نام سیتوکروم است که کافئین را پاکسازی می‌کند و قدرت تولید این آنزیم در افراد مختلف متفاوت است. با افزایش سن، سرعت متابولیسم کافئین کاهش می‌یابد. اگر بیماری خاصی دارید یا دارو مصرف می‌کنید، با پزشک مشورت کنید تا از تداخلات دارویی احتمالی آگاه شوید.';
    }
  }
  return '';
}

function getPregnancyBreastfeedingMessage(gender, pregnant, breastfeeding) {
  if (gender === 'female') {
    if (pregnant === 'yes') return 'قهوه برای شما مناسب نیست';
    if (breastfeeding === 'yes') return 'مصرف قهوه با احتیاط توصیه می‌شود';
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

    // Validation
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

    // Calculations
    const bmi = calculateBMI(weightNum, heightNum);
    const caffeine = calculateCaffeine(ageNum);
    const { message: bmiMessage, className } = getBMIMessage(bmi);
    const ageMessage = getAgeMessage(ageNum, gender);
    const pregnancyBreastfeedingMessage = getPregnancyBreastfeedingMessage(gender, pregnant, breastfeeding);

    let pregnancyMessage = '';
    if (gender === 'female') {
      if (pregnant === 'yes') {
        pregnancyMessage =
          'طبق تحقیقات به عمل آمده تا قبل از شش ماهگی فرایند جذب و دفع کافئین هنگام نوشیدن قهوه توسط مادر ممکن است صد و شصت ساعت (بیش از شش روز) طول بکشد. سازمان‌های بهداشتی مانند آکادمی اطفال آمریکا و سازمان جهانی بهداشت مصرف 200 میلی‌گرم کافئین در روز برای زنان باردار توصیه می‌کنند (معادل یک لیوان 240 میلی‌لیتری قهوه فرانسه یا دمی). توجه داشته باشید که مصرف زیاد قهوه در دوران بارداری ممکن است خطر سقط جنین، کاهش وزن نوزاد هنگام تولد یا زایمان زودرس را افزایش دهد. اگر نگران هستید، با پزشک مشورت کنید.';
      } else if (pregnant === 'no' && breastfeeding === 'no') {
        pregnancyMessage = ageMessage || 'بر اساس تحقیقات و توصیه‌های پزشکی مصرف محدود کافئین (تا 400 میلی‌گرم در روز) برای شما بی‌خطر است.';
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