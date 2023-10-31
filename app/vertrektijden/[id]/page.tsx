'use client';
import { useEffect, useState } from 'react';
import styles from './../../styles/Departures.module.scss';
import { fetchDepartureData } from './../../_utils/api';
import TrainEntry from '@/app/_components/TrainEntry';

const Page = ({ params }: { params: { id: string } }) => {
  const [stationDepartureTimes, setStationDepartureTimes] = useState<
    { direction: string; plannedDateTime: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departureData = await fetchDepartureData(params.id);
        setStationDepartureTimes(departureData);
        setLoading(false);
      } catch (error) {
        console.error('An error occurred:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Vertrektijden</h1>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          {stationDepartureTimes.map(({direction, plannedDateTime}, i) => (
            <TrainEntry direction={direction}  departure={plannedDateTime} key={i}/>
          //   <p key={i}>
          //   {direction} - {plannedDateTime}
          // </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default Page;
