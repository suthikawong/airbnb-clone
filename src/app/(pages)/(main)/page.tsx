import { fetchRoom } from '@/app/_actions/room'
import Wrapper from '@/components/app/Wrapper'
import PlaceCard from '@/components/app/pages/home/PlaceCard'

const Home: React.FC = async () => {
  const data = await fetchRoom()
  return (
    <Wrapper className="mb-18 mt-4">
      <div className="grid gap-6 min-[550px]:grid-cols-2 lg:grid-cols-3 min-[1128px]:grid-cols-4 min-[1640px]:grid-cols-5 min-[1880px]:grid-cols-6">
        {data.map((item, index) => (
          <PlaceCard key={index} data={item} />
        ))}
      </div>
    </Wrapper>
  )
}

export default Home

// const data = [
//   {
//     placeName: 'Muang Pattaya',
//     country: 'Thailand',
//     distance: 113,
//     // will return image id
//     images: [
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/d29aca88-b5d3-44e0-a4c1-e327168a9bb2.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/54501e9a-42d9-4046-81ad-960293a9d3df.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/d014ed0e-78e6-4928-bc02-4e3570b80d6c.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/c7463a7d-10d5-4c0a-a8c9-fdac03c90891.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b01130de-feef-4a0f-973a-5dbc968f92ee.jpg?im_w=720',
//     ],
//     startDate: new Date(),
//     endDate: new Date(),
//     price: 10599,
//     rating: 5.0,
//     isGuestFav: true,
//     isFav: false,
//   },
//   {
//     placeName: 'Muang Pattaya',
//     country: 'Thailand',
//     distance: 113,
//     // will return image id
//     images: [
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/d29aca88-b5d3-44e0-a4c1-e327168a9bb2.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/54501e9a-42d9-4046-81ad-960293a9d3df.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/d014ed0e-78e6-4928-bc02-4e3570b80d6c.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/c7463a7d-10d5-4c0a-a8c9-fdac03c90891.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b01130de-feef-4a0f-973a-5dbc968f92ee.jpg?im_w=720',
//     ],
//     startDate: new Date(),
//     endDate: new Date(),
//     price: 10599,
//     rating: 5.0,
//     isGuestFav: true,
//     isFav: false,
//   },
//   {
//     placeName: 'Muang Pattaya',
//     country: 'Thailand',
//     distance: 113,
//     // will return image id
//     images: [
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/d29aca88-b5d3-44e0-a4c1-e327168a9bb2.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/54501e9a-42d9-4046-81ad-960293a9d3df.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/d014ed0e-78e6-4928-bc02-4e3570b80d6c.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/c7463a7d-10d5-4c0a-a8c9-fdac03c90891.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b01130de-feef-4a0f-973a-5dbc968f92ee.jpg?im_w=720',
//     ],
//     startDate: new Date(),
//     endDate: new Date(),
//     price: 10599,
//     rating: 5.0,
//     isGuestFav: true,
//     isFav: false,
//   },
//   {
//     placeName: 'Muang Pattaya',
//     country: 'Thailand',
//     distance: 113,
//     // will return image id
//     images: [
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/d29aca88-b5d3-44e0-a4c1-e327168a9bb2.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/54501e9a-42d9-4046-81ad-960293a9d3df.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/d014ed0e-78e6-4928-bc02-4e3570b80d6c.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/c7463a7d-10d5-4c0a-a8c9-fdac03c90891.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b01130de-feef-4a0f-973a-5dbc968f92ee.jpg?im_w=720',
//     ],
//     startDate: new Date(),
//     endDate: new Date(),
//     price: 10599,
//     rating: 5.0,
//     isGuestFav: true,
//     isFav: false,
//   },
//   {
//     placeName: 'Muang Pattaya',
//     country: 'Thailand',
//     distance: 113,
//     // will return image id
//     images: [
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/d29aca88-b5d3-44e0-a4c1-e327168a9bb2.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/54501e9a-42d9-4046-81ad-960293a9d3df.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/d014ed0e-78e6-4928-bc02-4e3570b80d6c.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/c7463a7d-10d5-4c0a-a8c9-fdac03c90891.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b01130de-feef-4a0f-973a-5dbc968f92ee.jpg?im_w=720',
//     ],
//     startDate: new Date(),
//     endDate: new Date(),
//     price: 10599,
//     rating: 5.0,
//     isGuestFav: true,
//     isFav: false,
//   },
//   {
//     placeName: 'Muang Pattaya',
//     country: 'Thailand',
//     distance: 113,
//     // will return image id
//     images: [
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/d29aca88-b5d3-44e0-a4c1-e327168a9bb2.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/54501e9a-42d9-4046-81ad-960293a9d3df.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/d014ed0e-78e6-4928-bc02-4e3570b80d6c.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/c7463a7d-10d5-4c0a-a8c9-fdac03c90891.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b01130de-feef-4a0f-973a-5dbc968f92ee.jpg?im_w=720',
//     ],
//     startDate: new Date(),
//     endDate: new Date(),
//     price: 10599,
//     rating: 5.0,
//     isGuestFav: true,
//     isFav: false,
//   },
//   {
//     placeName: 'Muang Pattaya',
//     country: 'Thailand',
//     distance: 113,
//     // will return image id
//     images: [
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/d29aca88-b5d3-44e0-a4c1-e327168a9bb2.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/54501e9a-42d9-4046-81ad-960293a9d3df.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/d014ed0e-78e6-4928-bc02-4e3570b80d6c.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/c7463a7d-10d5-4c0a-a8c9-fdac03c90891.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b01130de-feef-4a0f-973a-5dbc968f92ee.jpg?im_w=720',
//     ],
//     startDate: new Date(),
//     endDate: new Date(),
//     price: 10599,
//     rating: 5.0,
//     isGuestFav: true,
//     isFav: false,
//   },
//   {
//     placeName: 'Muang Pattaya',
//     country: 'Thailand',
//     distance: 113,
//     // will return image id
//     images: [
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/d29aca88-b5d3-44e0-a4c1-e327168a9bb2.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/54501e9a-42d9-4046-81ad-960293a9d3df.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/d014ed0e-78e6-4928-bc02-4e3570b80d6c.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/c7463a7d-10d5-4c0a-a8c9-fdac03c90891.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b01130de-feef-4a0f-973a-5dbc968f92ee.jpg?im_w=720',
//     ],
//     startDate: new Date(),
//     endDate: new Date(),
//     price: 10599,
//     rating: 5.0,
//     isGuestFav: true,
//     isFav: false,
//   },
//   {
//     placeName: 'Muang Pattaya',
//     country: 'Thailand',
//     distance: 113,
//     // will return image id
//     images: [
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/d29aca88-b5d3-44e0-a4c1-e327168a9bb2.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/54501e9a-42d9-4046-81ad-960293a9d3df.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/d014ed0e-78e6-4928-bc02-4e3570b80d6c.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/hosting/Hosting-1010808410969749494/original/c7463a7d-10d5-4c0a-a8c9-fdac03c90891.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b01130de-feef-4a0f-973a-5dbc968f92ee.jpg?im_w=720',
//     ],
//     startDate: new Date(),
//     endDate: new Date(),
//     price: 10599,
//     rating: 5.0,
//     isGuestFav: true,
//     isFav: false,
//   },
// ]
