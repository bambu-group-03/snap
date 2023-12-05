import { View, Text } from '@/ui';

const NewGraph = () => {
  return (
    <View>
        <View className="container flex flex-col mx-auto bg-white">
            <View className="w-full draggable">
                <View className="container flex flex-col items-center gap-16 mx-auto my-32">
                <View className="grid w-full grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-8">
                    <View className="flex flex-col items-center">
                    <Text className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900"><span id="countto1" countTo="250"></span>+</Text>
                    <Text className="text-base font-medium leading-7 text-center text-dark-grey-600">Successful Projects</Text>
                    </View>
                    <View className="flex flex-col items-center">
                    <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900">$<span id="countto2" countTo="12"></span>m</h3>
                    <p className="text-base font-medium leading-7 text-center text-dark-grey-600">Annual Revenue Growth</p>
                    </View>
                    <View className="flex flex-col items-center">
                    <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900"><span id="countto3" countTo="2600" data-decimal="1"></span>k+</h3>
                    <p className="text-base font-medium leading-7 text-center text-dark-grey-600">Global Partners</p>
                    </View>
                    <View className="flex flex-col items-center">
                    <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900"><span id="countto4" countTo="18000"></span>+</h3>
                    <p className="text-base font-medium leading-7 text-center text-dark-grey-600">Daily Website Visitors</p>
                    </View>
                </View>
                </View>
            </View>
        </View>

         <View className="flex flex-wrap -mx-3 my-5">
            <View className="w-full max-w-full sm:w-3/4 mx-auto text-center">
                <p className="text-sm text-slate-500 py-1">
                    Tailwind CSS Component from <a href="https://www.loopple.com/theme/motion-landing-library?ref=tailwindcomponents" className="text-slate-700 hover:text-slate-900" target="_blank">Motion Landing Library</a> by <a href="https://www.loopple.com" className="text-slate-700 hover:text-slate-900" target="_blank">Loopple Builder</a>.
                </p>
            </View>
        </View>

        <script src="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/scripts/plugins/countup.min.js"></script>
        <script>
             let numbers = document.querySelectorAll("[countTo]");

                numbers.forEach((number) => {
                    let ID = number.getAttribute("id");
                    let value = number.getAttribute("countTo");
                    let countUp = new CountUp(ID, value);

                    if (number.hasAttribute("data-decimal")) {
                    const options = {
                          decimalPlaces: 1,
                        };
                    countUp = new CountUp(ID, 2.8, options);
                    } else {
                    countUp = new CountUp(ID, value);
                    }

                    if (!countUp.error) {
                    countUp.start();
                    } else {
                    console.error(countUp.error);
                    number.innerHTML = value;
                    }
                }); 
        </script>

        </View>


  );

};

export default NewGraph;