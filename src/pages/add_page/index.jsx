import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useCallback, useRef, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import classes from './style.module.css';
import categories from '../../menu-items/categories';
import CancelIcon from '@mui/icons-material/Cancel';
import { MuiTelInput } from 'mui-tel-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { isAuth } from '../../api/auth';
import { Navigate } from 'react-router';

const MapAddressSelector = ({ setAddressError, addressError, selectedAddress, setSelectedAddress }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState([38.573, 68.786]); // Начальные координаты (Москва)

  useEffect(() => {
    window.ymaps.ready(() => {
      const newMap = new window.ymaps.Map(mapRef.current, {
        center: coordinates,
        zoom: 12
      });

      newMap.events.add('click', async (e) => {
        const clickedCoords = e.get('coords');
        setCoordinates(clickedCoords);

        newMap.geoObjects.removeAll();

        const marker = new window.ymaps.Placemark(clickedCoords);
        newMap.geoObjects.add(marker);

        window.ymaps
          .geocode(clickedCoords, { results: 1 })
          .then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            if (firstGeoObject) {
              const address = firstGeoObject.getAddressLine();
              setSelectedAddress(address);
              setAddressError('');
              //   console.log('Адрес:', address);
            } else {
              setSelectedAddress('Адрес не найден');
            }
          })
          .catch((error) => {
            // console.error('Ошибка geocoding:', error);
            setSelectedAddress('Ошибка получения адреса');
          });
      });

      setMap(newMap);

      return () => {
        newMap.destroy();
      };
    });
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '400px',
          border: `1px solid ${!addressError ? 'rgba(0, 0, 0, 0.1)' : '#ff4d4f'}`,
          borderRadius: '5px',
          overflow: 'hidden'
        }}
      />
      {selectedAddress && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <strong>Выбранный адрес:</strong> {selectedAddress}
        </div>
      )}
      <span style={{ color: '#ff4d4f' }}>{addressError}</span>
    </div>
  );
};
const imagePreviewSize = '150px';

export default function AddPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [description, setDescription] = useState('');

  const handleChangePhone = (newPhone, info) => {
    setPhone(newPhone);

    if (newPhone) {
      try {
        const phoneNumber = parsePhoneNumberFromString(newPhone, info.countryCode);
        if (phoneNumber && phoneNumber.isValid()) {
          setError('');
        } else {
          setError('*Введите корректный номер телефона');
        }
      } catch (err) {
        setError('*Ошибка при обработке номера телефона');
      }
    } else {
      setError('*Введите корректный номер телефона');
    }
  };

  const handleSubmit = () => {
    let isError = false;
    if (!selectedAddress || selectedAddress == 'Ошибка получения адреса' || selectedAddress == 'Адрес не найден') {
      isError = true;
      setAddressError('*Выберите корректный адрес');
    }
    if (!title) {
      isError = true;
      setTitleError('*Название не может быть пустым');
    }
    if (!phone) {
      isError = true;
      setError('*Введите корректный номер телефона');
    }
    if (!!titleError) {
      isError = true;
    }
    if (!!error) {
      isError = true;
    }
    if (isError) {
      return;
    }

    console.log('title: ', title);
    console.log('phone: ', phone);
    console.log('description: ', description);

    console.log('Submitting to backend...');
  };

  if (!isAuth()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <TextField
          error={!!titleError}
          helperText={titleError}
          sx={{ width: '100%' }}
          id="outlined-basic"
          label="Название"
          variant="outlined"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (event.target.value == '') {
              setTitleError('*Название не может быть пустым');
            } else {
              setTitleError('');
            }
          }}
        />
        {/* <TextField sx={{ width: '300px' }} id="outlined-basic" label="" variant="outlined" /> */}
      </Box>
      <MuiTelInput
        sx={{ marginTop: '20px', width: '100%' }}
        value={phone}
        onChange={handleChangePhone}
        label="Номер телефона"
        defaultCountry="TJ"
        variant="outlined"
        fullWidth
        error={!!error}
        helperText={error}
        inputProps={{ inputMode: 'tel' }}
        focusOnSelectCountry
      />
      <TextField
        sx={{ marginTop: '20px', width: '100%' }}
        id="outlined-multiline-static"
        label="Описание"
        multiline
        rows={6}
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <h3 style={{ marginBottom: '5px', marginTop: '30px', fontWeight: 'normal', color: !addressError ? '#595959' : '#ff4d4f' }}>
        Выберите адрес
      </h3>
      <MapAddressSelector
        setAddressError={setAddressError}
        addressError={addressError}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      ></MapAddressSelector>
      <Button style={{ marginTop: '20px' }} onClick={handleSubmit} sx={{ fontSize: '16px' }} variant="contained">
        Опубликовать
      </Button>
    </Box>
  );
}
